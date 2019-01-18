import { MoveToFront, MoveToLeft, MoveToRight, StopMovingLeft, StopMovingRight, MoveToTop, MoveToBack, StopMovingTop, StopMovingDown, MoveToDown, StopMovingFront, StopMovingBack } from "../Move/Move";
import { getMode } from "../../datas/CollectAndShareDatas";
import { updateEffectorStart, updateEffectorEnd } from "../Draw/GenerateEffector";
export default function KeyboardCenter(event) {
    if(event.type === 'keydown') {
        KeyDown(event);
    } else if(event.type === 'keyup') {
        KeyUp(event);
    }
}
function KeyDown(event) {  
    if(getMode() === 0) {
        cameraStart(event);
    } else if(getMode() === 1) {
        updateEffectorStart(event.keyCode, event);
    } else if(getMode() === 2){
        updateEffectorEnd(event.keyCode, event);
    }
    event.preventDefault();
}
function KeyUp(event) {
    if(getMode() === 0) {
        cameraEnd(event);
    } 
}
function cameraStart(event) {
    switch(event.keyCode) {
        case 87: //W
            MoveToTop();
            break;
        case 83: //S
            MoveToDown();
            break;
        case 65: //A
            MoveToLeft();
            break;
        case 68: //D
            MoveToRight();
            break;
        case 70: //F
            MoveToFront();
            break;
        case 66: //B
            MoveToBack();
            break;
        default:
            break;
    }
}
function cameraEnd(event) {
    switch(event.keyCode) {
        case 87: //W
            StopMovingTop();
            event.preventDefault();
            break;
        case 83: //S
            StopMovingDown();
            event.preventDefault();
            break;
        case 65: //A
            StopMovingLeft();
            event.preventDefault();
            break;
        case 68: //D
            StopMovingRight();
            event.preventDefault();
            break;
        case 70: //F
            StopMovingFront();
            event.preventDefault();
            break;
        case 66: //B
            StopMovingBack();
            event.preventDefault();
            break;
        default:
            break;
    }
}