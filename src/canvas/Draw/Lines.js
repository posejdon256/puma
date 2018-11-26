import { _getDagonalSeen, _seenGravitation, _getSize } from "../../datas/CollectAndShareDatas";
import { getGravitationVector } from "../../Physics/Movement/Movement";
import { getW } from "../../Physics/RungyKutta/RungyKutta";

export function getLinesVertices() {
    const lines = [];
    const a = _getSize();
    const gravVec = getGravitationVector();
    const w = getW();
    if(_getDagonalSeen()) {
        lines.push(0, 0, 0, 1, 0, 0);
        lines.push(0, 0, 0, 0, 1, 0);
        lines.push(0, 0, 0, 0, 0, 1);
        //lines.push(0, 0, 0, gravVec._data[0], gravVec._data[1], gravVec._data[2]);
       // lines.push(0, 0, 0, w[0], w[1], w[2]);
        lines.push(0, 0, 0, 0,  a * Math.sqrt(3), 0);
    }
    return lines;
}
export function getLinesIndices() {
    const lines = [];
    if(_getDagonalSeen()) {
        lines.push(0, 1);
         lines.push(2, 3);
         lines.push(4, 5);
         lines.push(6, 7);
       //  lines.push(8, 9);
    }
    return lines;
}