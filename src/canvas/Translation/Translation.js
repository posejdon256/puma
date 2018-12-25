import { getCamera, getCameras } from "../Animation/AnimationFrame";

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
    const cameras = getCameras();
    const {front, left, top, axisX, axisY, alphaX, alphaY} = translationObject;
    //rotation
    if(axisX) {
        cameras[0].rotation.y += (alphaX / 10);
        cameras[1].rotation.y += (alphaX / 10);
    }
    if(axisY) {
        cameras[0].rotation.x += (alphaY / 10);
        cameras[1].rotation.x += (alphaY / 10);
    }
    //shift
    if(left !== undefined && left !== 0) {
        cameras[0].position.x += left;
        cameras[1].position.x += left;
    }
    if(top !== undefined && top !== 0) {
        cameras[0].position.y += top;
        cameras[1].position.y += top;
    }
    if(front !== undefined && front !== 0) {
        cameras[0].position.z /= front;
        cameras[1].position.z /= front;
    }
}