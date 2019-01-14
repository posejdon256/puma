
let points = [];
export function getLinesVerticesTrayectory() {
    let lines = [];
    lines = lines.concat(points);
    return lines;
}
export function addPointToDraw(x, y, z) {
    if(_getTrayectory()) {
        if(points.length !== 0) {
            points.push(0, 0, 0);
        }
        points.push(0, 0, 0);
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
export function getLinesVerticesX() {
    let lines = [];
  //  const a = _getSize();
    lines.push(0, 0, 0, 1, 0, 0);
    return lines;
}
export function getLinesVerticesY() {
    let lines = [];
  //  const a = _getSize();
    lines.push(0, 0, 0, 0, 1, 0);
    return lines;
}
export function getLinesVerticesZ() {
    let lines = [];
 //   const a = _getSize();
    lines.push(0, 0, 0, 0, 0, 1);
    return lines;
}
export function getLinesIndicesXYZ() {
    return [0, 1];
}
export function getLinesIndicesGravitation() {
    return [0, 1];
}