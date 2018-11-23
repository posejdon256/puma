import math from 'mathjs';
import { getTensor } from '../Tensor/Tensor';
import { getN } from '../Movement/Movement';

let q = math.matrix([math.cos(math.pi / 4), -math.sin(math.pi / 4), -math.sin(math.pi / 4), math.sin(math.pi / 4)]);
let w = math.matrix([0, 0, 0]);
let h = 0.001;
const I = getTensor();
const invI = math.inv(I);

export function countNextStep() {
    const sum = math.add;
    const mul = math.multiply;
    const div = math.divide;
    
    let k1 = mul(h, countDW(w));
    let k2 = countDW(sum(w, mul(0.5 * h, k1)));
    let k3 = countDW(sum(w, mul(0.5 * h, k2)));
    let k4 = countDW(sum(w, mul(k3, h)));

    let dw = mul(div(h, 6), (sum(k1, mul(k2, 2), mul(k3, 2), k4)));
    w = sum(w, dw);


    let k1Q = mul(h, countDQ(q, w));
    let k2Q = countDQ(sum(q, mul(0.5 * h, k1Q)), w);
    let k3Q = countDQ(sum(q, mul(0.5 * h, k2Q)), w);
    let k4Q = countDQ(sum(q, mul(k3Q, h)), w);

    let dq = mul(div(h, 6), (sum(k1Q, mul(k2Q, 2), mul(k3Q, 2), k4Q)));
    
    q = math.add(q, dq);
}
export function getQuaternion() {
    normalizeQuaternion();
    return q._data;
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
    const q = _q._data;
    const qMatrix = math.matrix([
        [-q[1], -q[2], -q[3]],
        [q[0], -q[3], q[2]],
        [q[3], q[0], -q[1]],
        [-q[2], q[1], q[0]],
    ]);
    return math.multiply(math.multiply(qMatrix, 1/2), _w);
}