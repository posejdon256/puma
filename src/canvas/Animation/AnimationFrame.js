import { Multiply, SumPoints } from '../../Helpers/Vectors';
import { getEnd, getStart } from '../Draw/GenerateEffector';
import { countInverseKinematics } from '../Geometry/CountInverseKinematics';
import { DrawPuma } from '../Geometry/DrawPuma';
import { getTime } from './Animation';

let cameras = [],
    renderers = [],
    scenes = [],
    THREE, 
    animationStarted = false,
    asnimationMoment = 0,
    qPrevs = [],
    crossPrev,
    startMoment;
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
    const d = new Date();
    startMoment = d.getTime();
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
function getCloser(a1, a2) {
    if(Math.abs(a1 - a2) > Math.PI) {
        if(a1 < a2) {
            return {
                a1: a1,
                a2: a2 - (2 * Math.PI)
            };
        } else {
            return {
                a1: a1 - (2 * Math.PI),
                a2: a2
            };
        }
    }
    return {
        a1: a1,
        a2: a2
    };
}
function animationStep() {
    const newDate = (new Date()).getTime();
   // asnimationMoment = (newDate - startMoment) / (getTime() * 1000);
    let endAnimation = asnimationMoment > 1;
    if(endAnimation) {
        animationStarted = false;
        asnimationMoment = 1;
    }
    const start = getStart(0);
    const end = getEnd(0);

    const angle1 = getCloser(start.alfa, end.alfa);
    const angle2 = getCloser(start.beta, end.beta);
    const angle3 = getCloser(start.gamma, end.gamma);

    const alfa = (1 - asnimationMoment)*angle1.a1 + angle1.a2 * asnimationMoment;
    const beta = (1 - asnimationMoment)*angle2.a1 + angle2.a2 * asnimationMoment;
    const gamma = (1 - asnimationMoment)*angle3.a1 + angle3.a2 * asnimationMoment;
    const p = SumPoints(Multiply(start, (1 - asnimationMoment)), Multiply(end,  asnimationMoment));
    const conf = countInverseKinematics(alfa, beta, gamma, p, true, asnimationMoment !== 0 ? qPrevs[0] : undefined, crossPrev);
    DrawPuma(0, conf.a1, conf.a2, conf.a3, conf.a4, conf.a5, conf.q, true);

    const conf1 = countInverseKinematics(angle1.a1, angle2.a1, angle3.a1, {x: start.x, y: start.y, z: start.z}, true);
    const conf2 = countInverseKinematics(angle1.a2, angle2.a2, angle3.a2, {x: end.x, y: end.y, z: end.z}, true);

    
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