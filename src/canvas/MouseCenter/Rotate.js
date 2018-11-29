import { DrawLines } from '../Draw/DrawLines';
import Translate from '../Translation/Translation';


let lastX;
let lastY;
let rotationXY = false;
let rotationZ = false;
const alpha = 0.10;
export function StartRotation(x, y, isZ){
    lastX = x;
    lastY = y;
    rotationXY = true;
}
export function StopRoatation(isZ){
    lastX = undefined;
    lastY = undefined;
    rotationXY = false;
        
}
export function TakeMouseMove(x, y){
    if((!rotationZ && !rotationXY) || (lastX === x && lastY === y)) {
        return;
    }
    let translationObject = {};
    if(Math.abs(lastX - x) > Math.abs(lastY - y)) {
        translationObject = {
            axisX: true,
            alphaX: lastX - x > 0 ? alpha: - alpha,
        }
    } else {
        translationObject = {
            axisY: true,
            alphaY: lastY - y > 0 ? alpha : - alpha,
        }
    }
    if(rotationZ) {
        translationObject.axisZ = true;
        translationObject.alphaZ = lastY - y > lastX - x ? alpha : - alpha;
    }
    lastX = x;
    lastY = y;
    Translate(translationObject);
    DrawLines();
}