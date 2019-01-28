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

    const p0 = {x: 0, y: - getL1() / 2, z: 0};
    const p1 = {x: 0, y: getL1() / 2, z: 0};
    const p3 = SumPoints(start, v1);
    const p4 = start;
    let n = normalize(crossMultiply(DiffPoints(p1, p0), DiffPoints(p3, p0)));
    if(isNaN(n.x) || getVectorLength(crossMultiply(DiffPoints(start, p3), n)) < 0.01) {
        n.x = 0;
        n.y = 0;
        n.z = -1;
    }
    let _n = Multiply(n, -1);
    const _v = Multiply(normalize(crossMultiply(DiffPoints(p4, p3), n)), -1);
    let p2 = SumPoints(p3, Multiply(normalize(_v), getL2()));

    let q = getVectorLength(DiffPoints(p2, p1));
    let minusAlfa = false;
    const _p2 = SumPoints(p3, Multiply(normalize(_v), -getL2()));
    if(prevQ && getVectorLength(DiffPoints(p2, prevQ)) > getVectorLength(DiffPoints(_p2, prevQ))) {
        p2 = _p2;
        q = getVectorLength(DiffPoints(p2, p1));
        minusAlfa = true;
    } else if(prevQ === undefined && q > getVectorLength(DiffPoints(_p2, p1))) {
        p2 = _p2;
        q = getVectorLength(DiffPoints(p2, p1));
        minusAlfa = true;
     }
     
     const z5 = normalize(getZ({rx: alfa, ry: beta, rz: gamma, px: p4.x, py: p4.y, pz: p4.z}));
     const x5 = normalize(getX({rx: alfa, ry: beta, rz: gamma, px: p4.x, py: p4.y, pz: p4.z}));

    let n2 = crossMultiply(normalize(DiffPoints(p1, p0)), normalize(DiffPoints(p2, p1)));
    let n3 = normalize(crossMultiply(DiffPoints(p1, p2), DiffPoints(p3, p2)));
    let n4 = normalize(crossMultiply(_n, x5));
   // addSphere(0, SumPoints(start, Multiply(z5, 10)));

     const len2 = getVectorLength(SumPoints(n, normalize(n2)));
    // const len3 = getVectorLength(SumPoints(n, n3));


    let a1 = Math.atan2(-p3.z, p3.x) + Math.PI;
    let a4 = Math.acos(scalarMultiply(_n, x5));
    a4 = minusAlfa ? -a4 : a4;
    a4 = isNaN(n4.x) ? Math.atan2(x5.z, x5.x) - Math.PI / 2 : a4;
    const a2 = _angle(DiffPoints(p1, p0), DiffPoints(p2, p1), _n) + Math.PI;
    const a3 = _angle(DiffPoints(p2, p1), DiffPoints(p3, p2), _n);
    const a5 = -_angle(DiffPoints(p2, p3), z5, x5) + Math.PI / 2;
    return {a1: a1, a2: a2, a3: a3, a4: a4, a5: a5, q: q, p2: p2, crossPrev: n3};

}
function _angle(vec1, vec2, vec3) {
    const _cross = crossMultiply(vec1, vec2);
    const angle = Math.atan2(getVectorLength(_cross), scalarMultiply(vec1, vec2));
    return scalarMultiply(_cross, vec3) <= 0 ? -angle : angle;
}