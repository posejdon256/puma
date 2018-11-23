import math from 'mathjs';
import { _getGravitation } from '../../datas/CollectAndShareDatas';

export function getN() {
    const cornerPos = math.matrix([1, 1, 1]);
    if(!_getGravitation()) {
        return math.matrix([0, 0, 0]);
    }
    const N = math.cross(cornerPos, getGravitationVector());
    return N;
}
function getGravitationVector() {
    return math.matrix([0, - 9.81, 0]);
}