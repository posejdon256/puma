import math from 'mathjs';
import { _getGravitation, _getSize } from '../../datas/CollectAndShareDatas';
import { rotateByQuternionQ } from '../Tensor/Rotation';
import { getQuaternion } from '../RungyKutta/RungyKutta';
import { getMass } from '../Tensor/Tensor';

export function getN() {
    const a = _getSize();
    const cornerPos = math.matrix([0, a * Math.sqrt(3), 0]);
    if(!_getGravitation()) {
        return math.matrix([0, 0, 0]);
    }
    const N = math.cross(cornerPos, getGravitationVector());
    return N;
}
export function getGravitationVector() { // to jest na pewno git
    const qMatrix = math.transpose(rotateByQuternionQ(prepareQuaternion()));
    return math.multiply(math.multiply(qMatrix, math.matrix([0, -9.81, 0])), getMass());
}
export function prepareQuaternion() {
    const _q = getQuaternion();
    return {
        x: _q[0],
        y: _q[1],
        z: _q[2],
        w: _q[3],
    }
}