import { _getDagonalSeen, _seenGravitation, _getSize, _getTrayectory, _getN } from "../../datas/CollectAndShareDatas";

let points = [];
export function getLinesVertices() {
    let lines = [];
    const a = _getSize();
    if(_getDagonalSeen()) {
        lines.push(0, 0, 0, 0,  a * Math.sqrt(3), 0);
    }
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
    if(_getN() < points.length) {
        points.shift();
        points.shift();
        points.shift();

        points.shift();
        points.shift();
        points.shift();
    }
}
export function getLinesIndices() {
    let lines = [];
    if(_getDagonalSeen()) {
        lines.push(0, 1);
    }
    if(_getTrayectory()) {
        for(let i = lines.length > 0 ? 6 : 0; i < points.length - 3; i += 6) {
            lines.push(i / 3, (i / 3) + 1);
        }
    }
    return lines;
}