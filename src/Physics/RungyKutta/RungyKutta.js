import math from 'mathjs';
import { getTensor } from '../Tensor/Tensor';
import { getN } from '../Movement/Movement';
import quaternion from 'quaternionjs';
let q = math.matrix([0, 0, 0, 1]);
normalizeQuaternion();

let w = math.matrix([0, 10, 0]);
let h = 0.01;
let I = getTensor();
let invI = math.inv(I);

export function updateTensor() {
    I = getTensor();
    invI = math.inv(I);
}
export function updateW(_w) {
    w = math.matrix([0, _w, 0]);
}
export function getW() {
    return [
        w._data[0],
        w._data[1],
        w._data[2],
    ]
}
export function countNextStep() {
    const sum = math.add;   
    const mul = math.multiply;
    const div = math.divide;
    
    let k1 = countDW(w);
    let k2 = countDW(sum(w, mul(h * 0.5, k1)));
    let k3 = countDW(sum(w, mul(h * 0.5, k2)));
    let k4 = countDW(sum(w, mul(k3, h)));

    let dw = mul(div(h, 6), sum(sum(sum(k1, mul(k2, 2)), mul(k3, 2)), k4));
    w = (sum(w, dw));
    let qPrim = math.matrix([0, 0, 0, 1]);
    let k1Q = countDQ(qPrim, w);
    let k2Q = countDQ(sum(qPrim, mul(h * 0.5, k1Q)), w);
    let k3Q = countDQ(sum(qPrim, mul(h * 0.5, k2Q)), w);
    let k4Q = countDQ(sum(qPrim, mul(k3Q, h)), w);

    let dq = mul(div(h, 6), sum(sum(sum(k1Q, mul(k2Q, 2)), mul(k3Q, 2)), k4Q));
    // const len = math.sqrt(math.pow(w._data[0], 2) + math.pow(w._data[1], 2) + math.pow(w._data[2], 2));
    // w = math.matrix([w._data[0] / len, w._data[1] / len, w._data[2] / len]);
    qPrim = sum(qPrim, dq);
    const multiplied = math.matrix(quaternion(q._data[0], q._data[1], q._data[2], q._data[3]).multi(quaternion(qPrim._data[0], qPrim._data[1], qPrim._data[2], qPrim._data[3])).array());
    q = multiplied;
    normalizeQuaternion();
}
export function getQuaternion() {
   // normalizeQuaternion();
    return q._data;
}
export function getQuaternionForM4() {
    return getQuaternion();
}
function normalizeQuaternion() {
    let _q = q._data;
    const len = math.sqrt(math.pow(_q[0], 2) + math.pow(_q[1], 2) + math.pow(_q[2], 2) + math.pow(_q[3], 2));
    _q[0] = _q[0] / len;
    _q[1] = _q[1] / len;
    _q[2] = _q[2] / len;
    _q[3] = _q[3] / len;
    q = math.matrix(_q);
}
function countDW(W) {
    const N = getN();
    return math.add(math.multiply(invI, N), math.multiply(invI, math.cross(math.multiply(I, W), W)));
}
function countDQ(_q, _w) {
    const _qData = _q._data;
    const multiplied = math.matrix(quaternion(_qData[0], _qData[1], _qData[2], _qData[3]).multi(quaternion(_w._data[0], _w._data[1], _w._data[2], 0)).array());
    const _helpQUaternion = math.multiply(multiplied, 1/2);

    return _helpQUaternion;
}