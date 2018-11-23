import math from 'mathjs';
import { _getGravitation } from '../../datas/CollectAndShareDatas';
import { rotateByQuternionQ } from '../Tensor/Rotation';
import { getQuaternion } from '../RungyKutta/RungyKutta';

export function getN() {
    const cornerPos = math.matrix([0.5, 0.5, 0.5]);
    if(!_getGravitation()) {
        return math.matrix([0, 0, 0]);
    }
    const N = math.cross(cornerPos, getGravitationVector());
    return N;
}
function getGravitationVector() {
    const qMatrix = rotateByQuternionQ(prepareQuaternion());
    return math.multiply(qMatrix, math.matrix([0, - 9.81, 0]));
}
function prepareQuaternion() {
    const _q = getQuaternion();
    return {
        w: _q[0],
        x: _q[1],
        y: _q[2],
        z: _q[3]
    }
}