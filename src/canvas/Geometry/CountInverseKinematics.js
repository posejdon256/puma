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

    const p1 = {x:0, y:0, z:0};
    const p2 = {x:0, y: getL1()/2, z: 0};

    const p5 = start;

    const z5 = normalize(getZ({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}));
    const x5 = normalize(getX({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}));
    const y5 = normalize(getZ({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}));
    const v1 = DiffPoints(getLastPoint({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}, -getL3()), start);
    const p4 = DiffPoints(p5, Multiply(x5, getL3())); 

    let n024 = normalize(crossMultiply(p4, p2));

    if (getVectorLength(n024)<0.0001) {
        n024 = {x:0, y:0, z:1};
    }
    n024 = normalize(n024);

    let z4 = normalize(crossMultiply(x5, n024));
    if(getVectorLength(z4)<0.0001){
        z4 = normalize(DiffPoints(p2,p4));
    }

    let p3 = SumPoints(p4, Multiply(z4, getL3()))
    const p3alt = SumPoints(p4, Multiply(z4, -getL3()));

    if(prevQ && getVectorLength(DiffPoints(p3, prevQ)) > getVectorLength(DiffPoints(p3alt, prevQ))) {
        p3 = p3alt;
    }

    const a1 =  - Math.atan2(p4.z, p4.x);
    const a2 = _angle(p2, DiffPoints(p3, p2), n024);
    const a3 = Math.PI +_angle(DiffPoints(p3, p2), DiffPoints(p4, p3), n024);
    const a4 = Math.PI -_angle(n024, x5,DiffPoints(p3, p4));
    const a5 = Math.PI/2 + _angle(DiffPoints(p3, p4),y5, x5);
    const q = getVectorLength(DiffPoints(p3, p2));
    const n3 = 12;
    return {a1: a1, a2: a2, a3: a3, a4: a4, a5: a5, q: q, p2: p3, crossPrev: p4};

}
function _angle(vec1, vec2, vec3) {
    const _cross = crossMultiply(vec1, vec2);
    const angle = Math.atan2(getVectorLength(_cross), scalarMultiply(vec1, vec2));
    return scalarMultiply(_cross, vec3) < 0 ? -angle : angle;
}