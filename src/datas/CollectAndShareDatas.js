let n = 100,
    speed = 1,
    displacement = 1,
    density = 1,
    cubeSize = 1,
    gravitation = false,
    trayectory = false,
    seendCube = true,
    seenDiagonal = false;

export function _setN(newValue) {
    n = TryParseInt(newValue, n);
}
export function _setSpeed(newValue) {
    speed = TryParseInt(newValue, speed);
}
export function _setDisplacement(newValue) {
    displacement = TryParseInt(newValue, displacement);
}
export function _setDensity(newValue) {
    density = TryParseInt(newValue, density);
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
    return n;
}
export function _getSpeed() {
    return speed;
}
export function _getDisplacement() {
    return displacement;
}
export function _getDensity() {
    return density;
}
export function _getSize() {
    return cubeSize;
}
export function _getGravitation() {
    return  gravitation;
}
export function _getTrayectory() {
    return trayectory;
}
export function _getCubeSeen() {
    return seendCube;
}
export function _getDagonalSeen() {
    return seenDiagonal;
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