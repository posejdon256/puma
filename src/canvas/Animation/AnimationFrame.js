import { Multiply, SumPoints } from '../../Helpers/Vectors';
import { getEnd, getStart } from '../Draw/GenerateEffector';
import { countInverseKinematics } from '../Geometry/CountInverseKinematics';
import { DrawPuma } from '../Geometry/DrawPuma';

let cameras = [],
    renderers = [],
    scenes = [],
    THREE, 
    animationStarted = false,
    asnimationMoment = 0,
    qPrevs = [],
    crossPrev;
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
    qPrevs = [];
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
    if(asnimationMoment >= 1.01) {
        animationStarted = false;
        asnimationMoment = 0;
        return;
    }
    const start = getStart(0);
    const end = getEnd(0);

    const alfa = (1 - asnimationMoment)*start.alfa + end.alfa * asnimationMoment;
    const beta = (1 - asnimationMoment)*start.beta + end.beta * asnimationMoment;
    const gamma = (1 - asnimationMoment)*start.gamma + end.gamma * asnimationMoment;
    const p = SumPoints(Multiply(start, (1 - asnimationMoment)), Multiply(end,  asnimationMoment));
    const conf = countInverseKinematics(alfa, beta, gamma, p, true, asnimationMoment !== 0 ? qPrevs[0] : undefined, crossPrev);
    DrawPuma(0, conf.a1, conf.a2, conf.a3, conf.a4, conf.a5, conf.q, true);

    const startSecond = getStart(0);
    const endSecond = getEnd(0);

    const conf1 = countInverseKinematics(startSecond.alfa, startSecond.beta, startSecond.gamma, {x: startSecond.x, y: startSecond.y, z: startSecond.z}, true);
    const conf2 = countInverseKinematics(endSecond.alfa, endSecond.beta, endSecond.gamma, {x: endSecond.x, y: endSecond.y, z: endSecond.z}, true);

    const alfa1 = (1 - asnimationMoment) * conf1.a1 + conf2.a1 * asnimationMoment;
    const alfa2 = (1 - asnimationMoment) * conf1.a2 + conf2.a2 * asnimationMoment;
    const alfa3 = (1 - asnimationMoment) * conf1.a3 + conf2.a3 * asnimationMoment;
    const alfa4 = (1 - asnimationMoment) * conf1.a4 + conf2.a4 * asnimationMoment;
    const alfa5 = (1 - asnimationMoment) * conf1.a5 + conf2.a5 * asnimationMoment;
    const q = (1 - asnimationMoment) * conf1.q + conf2.q * asnimationMoment;
    qPrevs = [];
    qPrevs.push(conf.p2);
    crossPrev = conf.crossPrev;
   // qPrevs.push(q);

    DrawPuma(1, alfa1, alfa2, alfa3, alfa4, alfa5, q, true);
}