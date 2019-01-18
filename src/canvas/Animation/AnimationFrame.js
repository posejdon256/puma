import { getL2, getL3, getPositionEnd, getPositionStart, getL1 } from '../../datas/CollectAndShareDatas';
import {
    crossMultiply,
    DiffPoints,
    getVectorLength,
    Multiply,
    normalize,
    scalarMultiply,
    SumPoints,
} from '../../Helpers/Vectors';
import {
    getLastPoint,
    getSmallCylinders,
} from '../Geometry/Cylinder';
import { updateEffectorAnglesCanvas1, updateEffectorAnglesCanvas2} from '../Geometry/CountInverseKinematics'
import { getEndAngles, getStartAngles } from './Animation';
import { getStart, getEnd } from '../Draw/GenerateEffector';
import { DrawPuma } from '../Geometry/DrawPuma';

let cameras = [],
    renderers = [],
    scenes = [],
    THREE, 
    animationStarted = false,
    asnimationMoment = 0,
    anglesStart = [0, 0, 0, 0, 0],
    angleEnd = [],
    qStart,
    qEnd;
export function getCamera(i) {
    return cameras[i];
}
export function getCameras(){
    return cameras;
}
export function setTHREE(_Three) {
    THREE = _Three;
}
export function getTHREE() {
    return THREE;
}
export function setCamera(_camera){
    cameras.push(_camera);
}
export function setScene(_scene){
    scenes.push(_scene);
}
export function setRenderer(_renderer) {
    renderers.push(_renderer)
}
export function getScene(i) {
    return scenes[i];
}
export function _startAnimation() {
  //  prepareAnglesConfiguration();
    animationStarted = true;
    asnimationMoment = 0;
    anglesStart = [0, 0, 0, 0];
}
function prepareAnglesConfiguration() {

    const smallCylinders = getSmallCylinders();
    const start = getStart();
    const end = getEnd();

    const v1 = DiffPoints(getLastPoint({rx: start.alfa, ry: start.beta, rz: start.gamma, px: start.x, py: start.y, pz: start.z}, getL3()), start);
    const p1 = smallCylinders[1].position;
    const p3 = SumPoints(start, Multiply(v1, -1));
    const p4 = start;
    const _normal = normalize(crossMultiply(smallCylinders[1].position, p3));
    const _v = Multiply(normalize(crossMultiply(DiffPoints(start, p3), _normal)), -1);
    const p2 = SumPoints(p3, Multiply(normalize(_v), -getL2()));
    qStart = getVectorLength(DiffPoints(p2, p1));

    const v1End = DiffPoints(getLastPoint({rx: end.alfa, ry: end.beta, rz: end.gamma, px: end.x, py: end.y, pz: end.z}, getL3()), end);
    const p1End = smallCylinders[1].position;
    const p3End = SumPoints(end, Multiply(v1End, -1));
    const _normalEnd = normalize(crossMultiply(smallCylinders[1].position, p3End));
    const _vEnd = Multiply(normalize(crossMultiply(DiffPoints(end, p3End), _normalEnd)), -1);
    const p2End = SumPoints(p3End, Multiply(normalize(_vEnd), -getL2()));
    const p4End = end;
    qEnd = getVectorLength(DiffPoints(p2End, p1End));

    //alfa 1
    let a1 = Math.atan2(p3.x, p3.z);
    let a2 = Math.atan2(p3End.x, p3End.z);
    if(anglesLen(a1, a2) > anglesLen(a1, a2 - 2 * Math.PI)) a2 = a2 - 2 * Math.PI;
    console.log(anglesLen(a1, a2), anglesLen(a1, a2 - 2 * Math.PI))
    anglesStart.push(a1);
    angleEnd.push(a2);

    //alfa 2
    a1 = Math.acos(scalarMultiply(normalize(p1), normalize(DiffPoints(p2, p1))));
    a2 = Math.acos(scalarMultiply(normalize(p1End), normalize(DiffPoints(p2End, p1End))));
    if(anglesLen(a1, a2) > anglesLen(a1, a2 - 2 * Math.PI)) a2 = a2 - 2 * Math.PI;
    anglesStart.push(a1);
    angleEnd.push(a2);

    //alfa 3
    a1 = Math.acos(scalarMultiply(normalize(DiffPoints(p2, p1)), normalize(DiffPoints(p3, p2))));
    a2 = Math.acos(scalarMultiply(normalize(DiffPoints(p2End, p1End)), normalize(DiffPoints(p3End, p2End))));
    if(anglesLen(a1, a2) > anglesLen(a1, a2 - 2 * Math.PI)) a2 = a2 - 2 * Math.PI;
    anglesStart.push(a1);
    angleEnd.push(a2);

    //alfa 4
    a1 = Math.acos(scalarMultiply(normalize(DiffPoints(p4, p3)), normalize(DiffPoints(p2, p3))));
    a2 = Math.acos(scalarMultiply(normalize(DiffPoints(p4End, p3End)), normalize(DiffPoints(p2End, p3End))));
    if(anglesLen(a1, a2) > anglesLen(a1, a2 - 2 * Math.PI)) a2 = a2 - 2 * Math.PI;
    anglesStart.push(a1);
    angleEnd.push(a2);

    //alfa 5
    anglesStart.push(Math.acos(scalarMultiply(normalize(DiffPoints(p4, p3)), normalize(DiffPoints(p2, p3)))));
    angleEnd.push(Math.acos(scalarMultiply(normalize(DiffPoints(p4End, p3End)), normalize(DiffPoints(p2End, p3End)))));
   // addSphere(1, p3);
}
function anglesLen(a1, a2) {
    return Math.sqrt(Math.pow(a1, 2) - Math.pow(a2, 2));
}
export function _animate() {
    if(animationStarted) {
        animationStep();
        asnimationMoment += 0.01;
    }
    requestAnimationFrame( _animate );
    renderers[0].render( scenes[0], cameras[0] );
    renderers[1].render( scenes[1], cameras[1] );
}
function animationStep() {
    if(asnimationMoment >= 1) {
        animationStarted = false;
        asnimationMoment = 0;
        angleEnd = [];
        anglesStart = [];
        return;
    }
    const start = getStart(0);
    const end = getEnd(0);

    // if(anglesLen(start.alfa, end.alfa) > anglesLen(start.alfa, end.alfa + 2 * Math.PI)) end.alfa = end.alfa + 2 * Math.PI;
    // if(anglesLen(start.beta, end.beta) > anglesLen(start.beta, end.beta + 2 * Math.PI)) end.beta = end.beta + 2 * Math.PI;
    // if(anglesLen(start.gamma, end.gamma) > anglesLen(start.gamma, end.gamma + 2 * Math.PI)) end.gamma = end.gamma + 2 * Math.PI;

    const alfa = (1 - asnimationMoment)*start.alfa + end.alfa * asnimationMoment;
    const beta = (1 - asnimationMoment)*start.beta + end.beta * asnimationMoment;
    const gamma = (1 - asnimationMoment)*start.gamma + end.gamma * asnimationMoment;
    const p = SumPoints(Multiply(start, (1 - asnimationMoment)), Multiply(end,  asnimationMoment));
    updateEffectorAnglesCanvas1(alfa, beta, gamma, p, true);

    const alfa1 = (1 - asnimationMoment) * anglesStart[0] + angleEnd[0] * asnimationMoment;
    const alfa2 = (1 - asnimationMoment) * anglesStart[1] + angleEnd[1] * asnimationMoment;
    const alfa3 = (1 - asnimationMoment) * anglesStart[2] + angleEnd[2] * asnimationMoment;
    const alfa4 = (1 - asnimationMoment) * anglesStart[3] + angleEnd[3] * asnimationMoment;
    const alfa5 = (1 - asnimationMoment) * anglesStart[4] + angleEnd[4] * asnimationMoment;
    const q = (1 - asnimationMoment) * qStart + qEnd * asnimationMoment;

    updateEffectorAnglesCanvas2(alfa1, alfa2, alfa3, alfa4, alfa5, q);

}