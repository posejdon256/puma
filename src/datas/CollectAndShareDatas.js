import { TryParseFloat } from '../Helpers/Parse';
import { updateL1, updateL2, updateL3 } from '../canvas/Geometry/DrawPuma';

let l1 = 60,
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
export function getL3() {
    return l3;
}
export function setL3(_value) {
    l3 = TryParseFloat(_value, l3);
    updateL3();
}
export function getL2() {
    return l2;
}
export function setL2(_value) {
    l2 = TryParseFloat(_value, l2);
    updateL2();
}
export function getL1() {
    return l1;
}
export function setL1(_value) {
    l1 = TryParseFloat(_value, l1);
    updateL1();
}