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
import { getLastPoint, getX, getZ } from './Cylinder';



export function countInverseKinematics(alfa, beta, gamma, start, _animation, prevQ) {

     const v1 = DiffPoints(getLastPoint({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}, getL3()), start);
     let point = SumPoints(start, v1);

    const p0 = {x: 0, y:0, z: 0};
    const p1 = {x: 0, y: getL1() / 2, z: 0};
    const _normal = normalize(crossMultiply(p1, point));
    if(isNaN(_normal.x)) {
        _normal.x = 0;
        _normal.y = 0;
        _normal.z = -1;
    }
    const _v = Multiply(normalize(crossMultiply(DiffPoints(start, point), _normal)), -1);
    let p2 = SumPoints(point, Multiply(normalize(_v), getL2()));
    const p3 = point;

    let q = getVectorLength(DiffPoints(p2, p1));
    let minusAlfa = false;
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
     
    const n1 = normalize(crossMultiply(DiffPoints(p1, p2), DiffPoints(p3, p2)));
    const n2 = normalize(crossMultiply(p3, p1));

    const len = getVectorLength(SumPoints(n1, n2));

    const z5 = normalize(getZ({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}));
    const x5 = normalize(getX({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}));

    const a1 = Math.atan2(-p3.z, p3.x) + Math.PI;
    const a2 = Math.acos(scalarMultiply(normalize(DiffPoints(p1, p0)), normalize(DiffPoints(p2, p1))));
    let a3 =  Math.acos(scalarMultiply(normalize(DiffPoints(p1, p2)), normalize(DiffPoints(p3, p2))));
    let a4 = Math.acos(scalarMultiply(normalize(crossMultiply(p3, p1)), x5));
    const a5 = Math.acos(scalarMultiply(normalize(crossMultiply(p2, p3)), z5));
    a4 = minusAlfa ? -a4 : a4;
    a3 = Math.abs(len) < 0.01 ? a3 : -a3;
    if(!_animation) {
       // addSphere(0, SumPoints(p4, Multiply(x5, 10)));
    }
    return {a1: a1, a2: a2, a3: a3, a4: a4, a5: a5, q: q, p2: p2};

}