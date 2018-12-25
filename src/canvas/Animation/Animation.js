import Translate, { setPosition } from "../Translation/Translation";
import { quaterion } from "../../Helpers/Quaternion/quaternion";
import { Lerp, Slerp } from "./QuaternionInterpolation";
import mat4 from 'gl-matrix-mat4';
import { EulerLerp } from "./Euler";
import { TryParseFloat } from "../../Helpers/Parse";
import { TryParseInt } from "../../datas/CollectAndShareDatas";
import { DrawArms } from "../Draw/DrawRobotArm";

let start = [-0.6, 0.87, 0];
let end = [0.5, -0.9, 0];
let _qStart = {x: 0, y: 0, z: 0, w: 1};
let _qEnd = {x: 1, y: 1, z: 1, w: 1};

let qStart;
let qEnd;

let speed = 10;
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

export function setAlfa1(_alfa) {
    alfa1 = (TryParseFloat(_alfa, alfa1 / 180) * Math.Pi);
}
export function setBeta1(_beta) {
    beta1 = (TryParseFloat(_beta, beta1) / 180) * Math.Pi;
}
export function setGamma1(_gamma) {
    gamma1 = (TryParseFloat(_gamma, gamma1) / 180) * Math.Pi;
}
export function setAlfa2(_alfa) {
    alfa2 = (TryParseFloat(_alfa, alfa2) / 180) * Math.Pi;
}
export function setBeta2(_beta) {
    beta2 = (TryParseFloat(_beta, beta2) / 180) * Math.Pi;
}
export function setGamma2(_gamma) {
    gamma2 = (TryParseFloat(_gamma, gamma2) / 180) * Math.Pi;
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