import math from 'mathjs';

import { _getDensity, _getSize } from '../../datas/CollectAndShareDatas';

export function getTensor(angle) {
    const a = _getSize();
    const x_2 = getX2_Y2_Z2(), y_2 = x_2, z_2 = x_2;
    const xy = getXY_YZ_XZ(), xz = xy, yz = xy;

    let tensor = math.matrix([
        [y_2 + z_2, -xy, -xz],
        [-xy, x_2 + z_2, -yz],
        [-xz, -yz, x_2 + y_2]]
    );

    const p = {x: 1, y: 1, z: 1};
    tensor = Stainer(p, tensor);
    return tensor;
}
function Stainer(p, tensor) {
    const m = getMass();
    const pow = math.pow;
    const { x, y, z } = p;
    const tensorCO = math.matrix([
        [m * (pow(y, 2) + pow(z, 2)), -m * x * y, -m * x * z],
        [-m * x * y, m * (pow(x, 2) + pow(z, 2)), -m * y * z],
        [-m * x * z, -m * y * z, m * (pow(y, 2) + pow(x, 2))]
    ]);
    return math.add(tensor, tensorCO);


}
function getMass() {
    const a = _getSize();
    const density = _getDensity();
    return 8 * Math.pow(a, 3) * density;
}
function getX2_Y2_Z2() {
    const a = _getSize();
    const density = _getDensity();
    return 8 * Math.pow(a, 5) * density;
}
function getXY_YZ_XZ() {
    return 0;
}