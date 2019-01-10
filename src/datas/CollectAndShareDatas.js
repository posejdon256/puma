import { updateTensor, updateW, updateQuaternion } from "../Physics/RungyKutta/RungyKutta";
import { TryParseFloat } from "../Helpers/Parse";

let n = 100,
    speed = 1,
    displacement = 1,
    density = 1,
    cubeSize = 1,
    gravitation = false,
    trayectory = false,
    seendCube = true,
    seenDiagonal = true,
    l1 = 1,
    l2 = 1,
    l3 = 1,
    l4 = 1;
export function getL4() {
    return l4;
}
export function setL4(_value) {
    l4 = TryParseFloat(_value, l4);
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
export function _setN(newValue) {
    n = TryParseInt(newValue, n);
    updateTensor();
}
export function _setSpeed(newValue) {
    speed = TryParseInt(newValue, speed);
    updateW(speed);
}
export function _setDisplacement(newValue) {
    if(!isNaN(newValue) && newValue.toString().indexOf('.') !== -1)
    {
        displacement = newValue;
    }
    updateQuaternion(displacement);
}
export function _setDensity(newValue) {
    density = TryParseInt(newValue, density);
    updateTensor();
}
export function _setSize(newValue) {
    cubeSize = TryParseInt(newValue, cubeSize);
}
export function _seenGravitation() {
    gravitation = !gravitation;
}
export function _seenTrayectory() {
    trayectory = !trayectory;
}
export function _seenCube() {
    seendCube = !seendCube;
}
export function _seenDagonal() {
    seenDiagonal = !seenDiagonal;
}
export function _getN() {
    return n ? n : 1;
}
export function _getSpeed() {
    return displacement ? speed : 0;
}
export function _getDisplacement() {
    return displacement ? displacement : 1;
}
export function _getDensity() {
    return density ? density: 1;
}
export function _getSize() {
    return cubeSize ? cubeSize : 1;
}
export function _getGravitation() {
    return  gravitation ? gravitation : false;
}
export function _getTrayectory() {
    return trayectory ? trayectory : false;
}
export function _getCubeSeen() {
    return seendCube ? seendCube : true;
}
export function _getDagonalSeen() {
    return seenDiagonal ? seenDiagonal : false;
}
export function TryParseInt(str ,defaultValue) {
    let retValue = defaultValue;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str, 10);
            }
        }
    }
    return retValue;
}