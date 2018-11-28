import { _getDagonalSeen, _seenGravitation, _getSize, _getTrayectory, _getN } from "../../datas/CollectAndShareDatas";

let points = [];
export function getLinesVerticesTrayectory() {
    let lines = [];
    lines = lines.concat(points);
    return lines;
}
export function addPointToDraw(x, y, z) {
    if(_getTrayectory()) {
        if(points.length !== 0) {
            points.push(x, y, z);
        }
        points.push(x, y, z);
    }
}
export function removePointToDraw() {
        while(points.length > _getN() * 3 + 3) {
            points.shift();
        }
}
export function getLinesIndicesTrayectory() {
    let lines = [];
    if(_getTrayectory()) {
        for(let i = lines.length > 0 ? 6 : 0; i < points.length - 3; i += 6) {
            lines.push(i / 3, (i / 3) + 1);
        }
    }
    return lines;
}
export function getLinesVerticesDiagonal() {
    let lines = [];
    const a = _getSize();
    lines.push(0, 0, 0, 0,  a * Math.sqrt(3), 0);
    return lines;
}
export function getLinesIndicesDiagonal() {
    return [0, 1];
}
export function getLinesVerticesGraviatation() {
    let lines = [];
    lines.push(0, 0, 0, 0,  -9.81, 0);
    return lines;
}
export function getLinesIndicesGravitation() {
    return [0, 1];
}