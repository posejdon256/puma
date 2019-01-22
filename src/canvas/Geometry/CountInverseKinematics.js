import { getL2, getL3, getL1 } from '../../datas/CollectAndShareDatas';
import {
    crossMultiply,
    DiffPoints,
    getVectorLength,
    Multiply,
    normalize,
    scalarMultiply,
    SumPoints,
} from '../../Helpers/Vectors';
import { getLastPoint, getX, getZ, addSphere } from './Cylinder';



export function countInverseKinematics(alfa, beta, gamma, start, _animation, prevQ, nPrev) {

     const v1 = DiffPoints(getLastPoint({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}, getL3()), start);
     let point = SumPoints(start, v1);

    const p0 = {x: 0, y:0, z: 0};
    const p1 = {x: 0, y: getL1() / 2, z: 0};
    const _normal = normalize(crossMultiply(p1, point));
    if(isNaN(_normal.x) || getVectorLength(crossMultiply(DiffPoints(start, point), _normal)) < 0.01) {
        _normal.x = 0;
        _normal.y = 0;
        _normal.z = -1;
    }
    const _v = Multiply(normalize(crossMultiply(DiffPoints(start, point), _normal)), -1);
    let p2 = SumPoints(point, Multiply(normalize(_v), getL2()));
    const p3 = point;

    let q = getVectorLength(DiffPoints(p2, p1));
    let minusAlfa = false;
    let minusAlfa2 = false;
    const _p2 = SumPoints(point, Multiply(normalize(_v), -getL2()));
    if(prevQ && getVectorLength(DiffPoints(p2, prevQ)) > 2) {
        p2 = _p2;
        q = getVectorLength(DiffPoints(p2, p1));
        minusAlfa = true;
     } else if(prevQ === undefined && q > getVectorLength(DiffPoints(_p2, p1))) {
        p2 = _p2;
        q = getVectorLength(DiffPoints(p2, p1));
        minusAlfa = true;
     }
     
     const z5 = normalize(getZ({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}));
     const x5 = normalize(getX({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}));

    let n = normalize(crossMultiply(p3, p1));
     if(isNaN(n.x)) {
         n.x = 0;
         n.y = 0;
         n.z = -1;
     }

    let n2 = normalize(crossMultiply(normalize(DiffPoints(p1, p0)), normalize(DiffPoints(p2, p1))));
    let n3 = normalize(crossMultiply(DiffPoints(p1, p2), DiffPoints(p3, p2)));
    let n4 = normalize(crossMultiply(normalize(crossMultiply(p3, p1)), x5));
    let n5 = normalize(crossMultiply(normalize(crossMultiply(p3, p2)), z5));

    const len2 = getVectorLength(SumPoints(n, n2));
    const len3 = getVectorLength(SumPoints(n, n3));
    const len4 = getVectorLength(SumPoints(n, n4));
    const len5 = getVectorLength(SumPoints(n, n5));

    let a1 = Math.atan2(-p3.z, p3.x) + Math.PI;
    let a2 = Math.acos(scalarMultiply(normalize(DiffPoints(p1, p0)), normalize(DiffPoints(p2, p1))));
    let a3 =  Math.acos(scalarMultiply(normalize(DiffPoints(p1, p2)), normalize(DiffPoints(p3, p2))));
    let a4 = Math.acos(scalarMultiply(normalize(crossMultiply(p3, p1)), x5));
    let a5 = Math.acos(scalarMultiply(normalize(crossMultiply(p3, p2)), z5));

    //a3 = -a3;
    a4 = minusAlfa ? -a4 : a4;
    a2 = isNaN(len2) || Math.abs(len2) < 0.01 ? a2 : -a2;
    a3 = !isNaN(len3) && Math.abs(len3) < 0.01 ? a3 : -a3;
   // a4 = Math.abs(len2) < 0.01 ? a4 : -a4;
    a5 = Math.abs(len5) < 0.01 ? -a5 : a5;
    a2 = isNaN(n2.x) ? Math.PI / 2 : a2;
    a3 = isNaN(n3.x) ? 0: a3;
    a4 = isNaN(n4.x) ? Math.atan2(x5.z, x5.x) - Math.PI / 2 : a4;
    a5 = isNaN(n5.x) ? Math.atan2(z5.z, z5.x) : a5;

    return {a1: a1, a2: a2, a3: a3, a4: a4, a5: a5, q: q, p2: p2, crossPrev: n3};

}