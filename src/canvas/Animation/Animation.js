import mat4 from 'gl-matrix-mat4';

import { TryParseFloat, TryParseInt } from '../../Helpers/Parse';
import { quaterion } from '../../Helpers/Quaternion/quaternion';
import { updateEffectorEnd, updateEffectorStart } from '../Draw/GenerateEffector';
import Translate, { setPosition } from '../Translation/Translation';
import { EulerLerp } from './Euler';
import { Lerp, Slerp } from './QuaternionInterpolation';

let start = [-0.6, 0.87, 0];
let end = [0.5, -0.9, 0];
let _qStart = {x: 0, y: 0, z: 0, w: 1};
let _qEnd = {x: 1, y: 1, z: 1, w: 1};

let qStart;
let qEnd;

let speed = 1;
let step;
let divisions;
let stepInSides = {};
let animationQuaternion;
let animationMatrix;

let alfa2 = 0.3;
let beta2 = 0.5;
let gamma2 = 0.7;
let alfa1 = 0;
let beta1 = 0;
let gamma1 = 0;

let slerp = true;
let angleStep;

let animationId;
function prepareAngle(angle) {
    while (angle < 0) {
        angle = 360 + angle;
    }
    while(angle > 360) {
        angle = angle - 360;
    }
    return angle;
}
export function getStartAngles() {
    return { alfa: alfa1, beta: beta1, gamma: gamma1 + Math.PI/2};
}
export function getEndAngles() {
    return { alfa: alfa2, beta: beta2, gamma: gamma2 + Math.PI/2};
}
export function setAlfa1(_alfa) {
    let _alfa1 = TryParseFloat(_alfa, alfa1);
    if(_alfa1 !== alfa1) {
        _alfa1 = (prepareAngle(_alfa1) / 180) * Math.PI;
    }
    alfa1 = _alfa1;
    console.log(prepareAngle(_alfa1));
    updateEffectorStart({alfa: _alfa1});
}
export function setBeta1(_beta) {
    let _beta1 = TryParseFloat(_beta, beta1);
    if(_beta1 !== beta1) {
        _beta1 = (prepareAngle(_beta1) / 180) * Math.PI;
    }
    beta1 = _beta1;
    updateEffectorStart({beta: _beta1});
}
export function setGamma1(_gamma) {
    let _gamma1 = TryParseFloat(_gamma, gamma1);
    if(_gamma1 !== gamma1) {
        _gamma1 = (prepareAngle(_gamma1) / 180) * Math.PI;
    }
    gamma1 = _gamma1;
    updateEffectorStart({gamma: _gamma1});
}
export function setAlfa2(_alfa) {
    let _alfa2 = TryParseFloat(_alfa, alfa2);
    if(_alfa2 !== alfa2) {
        _alfa2 = (prepareAngle(_alfa2) / 180) * Math.PI;
    }
    alfa2 = _alfa2;
    updateEffectorEnd({alfa: _alfa2});
}
export function setBeta2(_beta) {
    let _beta2 = TryParseFloat(_beta, beta2);
    if(_beta2 !== beta2) {
        _beta2 = (prepareAngle(_beta2) / 180) * Math.PI;
    }
    beta2 = _beta2;
    updateEffectorEnd({beta: _beta2});
}
export function setGamma2(_gamma) {
    let _gamma2 = TryParseFloat(_gamma, gamma1);
    if(_gamma2 !== gamma2) {
        _gamma2 = (prepareAngle(_gamma2) / 180) * Math.PI;
    }
    gamma2 = _gamma2;
    updateEffectorEnd({gamma: _gamma2});
}
export function getTime() {
    return speed;
}
export function setSpeed(_speed) {
    speed = TryParseInt(_speed, speed);
}
export function setX1(val) {
    qStart.x = TryParseFloat(val, qStart.x);
}
export function setX2(val) {
    qEnd.x = TryParseFloat(val, qEnd.x);
}
export function setY1(val) {
    qStart.y = TryParseFloat(val, qStart.y);
}
export function setY2(val) {
    qEnd.y = TryParseFloat(val, qEnd.y);
}
export function setZ1(val) {
    qStart.z = TryParseFloat(val, qStart.z);
}
export function setZ2(val) {
    qEnd.z = TryParseFloat(val, qEnd.z);
}
export function setW1(val) {
    qStart.w = TryParseFloat(val, qStart.w);
}
export function setW2(val) {
    qEnd.w = TryParseFloat(val, qEnd.w);
}
export function setLerpSlerp() {
    slerp = !slerp;
}
export function prepareAnimation() {
    step = 0;
    divisions = parseInt(10000 / speed);
    stepInSides = {
        x: (end[0] - start[0]) / divisions,
        y: (end[1] - start[1]) / divisions,
        z: (end[2] - start[2]) / divisions,
    };

    angleStep = (alfa2 + beta2  + gamma2) / divisions;
    qStart = quaterion(_qStart.x, _qStart.y, _qStart.z, _qStart.w).norm();
    qEnd = quaterion(_qEnd.x, _qEnd.y, _qEnd.z, _qEnd.w).norm();

    animationQuaternion = quaterion(qStart.x, qStart.y, qStart.z, qStart.w).norm();
    animationMatrix = mat4.create();

    setPosition(start);

    animationId = setInterval(animationStep, 10);
}
export function animationStep() {
    step ++;
    Translate({left: stepInSides.x, top: stepInSides.y, front: stepInSides.z});
    if(step >= divisions) {
        endAnimation();
    }
    animationQuaternion = slerp ? Slerp(qStart, qEnd, step / divisions).norm() : Lerp(qStart, qEnd, step / divisions).norm();
    mat4.multiply(animationMatrix, animationMatrix, EulerLerp(alfa2, beta2, gamma2, step / divisions, angleStep));
}
export function endAnimation() {
    clearInterval(animationId);
}
export function getAnimationQuaternion() {
    if(animationQuaternion) {
        return animationQuaternion;
    }
    return quaterion(0, 0, 0, 1);
}
export function getAnimationMatrix(){
    if(!animationMatrix) {
        return mat4.create();
    }
    return animationMatrix;
}