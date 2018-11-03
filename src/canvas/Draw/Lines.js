import { _getDagonalSeen, _seenGravitation } from "../../datas/CollectAndShareDatas";

export function getLinesVertices() {
    const lines = [];
    if(_getDagonalSeen()) {
        lines.push(1, 1, 1, -1, -1, -1);
    }
    return lines;
}
export function getLinesIndices() {
    const lines = [];
    if(_getDagonalSeen()) {
        lines.push(0, 1);
    }
    return lines;
}