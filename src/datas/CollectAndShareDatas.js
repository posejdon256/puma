import { TryParseFloat } from '../Helpers/Parse';

let l1 = 30,
    l2 = 30,
    l3 = 30,
    x1 = 60,
    y1 = 0,
    z1 = 0,
    x2 = 60,
    y2 = 0,
    z2 = 0,
    mode = 0; // 0 - camera, 1 - start, 2 - end
export function getPositionEnd() {
    return{
        x: x2,
        y: y2,
        z: z2
    };
}
export function getPositionStart() {
    return {
        x: x1,
        y: y1,
        z: z1
    };
}
export function setMode(value) {
    mode = value;
}
export function getMode() {
    return mode;
}
export function getZ2() {
    return z2;
}
export function setZ2(_value) {
    z2 = TryParseFloat(_value, z2);
}
export function getY2() {
    return y2;
}
export function setY2(_value) {
    y2 = TryParseFloat(_value, y2);
}
export function getX2() {
    return x2;
}
export function setX2(_value) {
    x2 = TryParseFloat(_value, x2);
}
export function getZ1() {
    return z1;
}
export function setZ1(_value) {
    z1 = TryParseFloat(_value, z1);
}
export function getY1() {
    return y1;
}
export function setY1(_value) {
    y1 = TryParseFloat(_value, y1);
}
export function getX1() {
    return x1;
}
export function setX1(_value) {
    x1 = TryParseFloat(_value, x1);
}
export function getL3() {
    return l3;
}
export function setL3(_value) {
    l3 = TryParseFloat(_value, l3);
}
export function getL2() {
    return l2;
}
export function setL2(_value) {
    l2 = TryParseFloat(_value, l2);
}
export function getL1() {
    return l1;
}
export function setL1(_value) {
    l1 = TryParseFloat(_value, l1);
}