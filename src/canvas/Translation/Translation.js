let radX = 0, radY = 0;
let transVec = [0, 0, 0];
let zoom = 0.5;
export function getTranslationVector() {
    return transVec;
}
export function getRotationDatas() {
    return {x: radX, y: radY};
}
export function getZooming() {
    return [zoom, zoom, zoom];
}
export function setPosition(vec) {
    transVec = [vec[0], vec[1], vec[2]];
}
export default function Translate(translationObject) {
    const {front, left, top, axisX, axisY, alphaX, alphaY} = translationObject;
    //rotation
    if(axisX) {
        radY += alphaX;//bug
    }
    if(axisY) {
        radX += alphaY;//bug
    }
    //shift
    if(left !== undefined && left !== 0) {
        transVec[0] += left;
    }
    if(top !== undefined && top !== 0) {
        transVec[1] += top;
    }
    if(front !== undefined && front !== 0) {
        zoom *= front;
    }
}