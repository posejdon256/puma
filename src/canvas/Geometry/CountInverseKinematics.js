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
    const _p2 = SumPoints(point, Multiply(normalize(_v), -getL2()));
    if(prevQ && getVectorLength(DiffPoints(p2, prevQ)) > getVectorLength(DiffPoints(_p2, prevQ))) {
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

    let n = crossMultiply(p3, p1);
     if(getVectorLength(n) < 0.0001) {
         n.x = 0;
         n.y = 0;
         n.z = -1;
     }
     n = normalize(n);
    let n2 = crossMultiply(normalize(DiffPoints(p1, p0)), normalize(DiffPoints(p2, p1)));
    let n3 = normalize(crossMultiply(DiffPoints(p1, p2), DiffPoints(p3, p2)));
    let n4 = normalize(crossMultiply(normalize(crossMultiply(p3, p1)), x5));
   // addSphere(0, SumPoints(start, Multiply(z5, 10)));

    const len2 = getVectorLength(SumPoints(n, normalize(n2)));
    const len3 = getVectorLength(SumPoints(n, n3));


    let a1 = Math.atan2(-p3.z, p3.x) + Math.PI;
    let a2 = Math.acos(scalarMultiply(normalize(DiffPoints(p1, p0)), normalize(DiffPoints(p2, p1))));
    //let a3 =  Math.acos(scalarMultiply(normalize(DiffPoints(p1, p2)), normalize(DiffPoints(p3, p2))));
    let a4 = Math.acos(scalarMultiply(normalize(crossMultiply(p3, p1)), x5));

    a4 = minusAlfa ? -a4 : a4;
    a2 = !isNaN(len2) && Math.abs(len2) < 0.01 ? a2 : -a2;
   // a3 = !isNaN(len3) && Math.abs(len3) < 0.01 ? a3 : -a3;
    a2 = isNaN(n2.x) ? 0 : a2;
  //  a3 = isNaN(n3.x) ? Math.PI : a3;
    a4 = isNaN(n4.x) ? Math.atan2(x5.z, x5.x) - Math.PI / 2 : a4;

    const a3 = _angle(DiffPoints(p2, p1), DiffPoints(p3, p2), normalize(DiffPoints(p3, p1))) + Math.PI;
    const a5 = -_angle(DiffPoints(p2, p3), z5, x5) + Math.PI / 2;
    return {a1: a1, a2: a2, a3: a3, a4: a4, a5: a5, q: q, p2: p2, crossPrev: n3};

}
function _angle(vec1, vec2, vec3) {
    const _cross = crossMultiply(vec1, vec2);
    const angle = Math.atan2(getVectorLength(_cross), scalarMultiply(vec1, vec2));
    return scalarMultiply(_cross, vec3) < 0 ? -angle : angle;
}