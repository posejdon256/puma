import math from 'mathjs';
export function rotateByQuternionQ(q) {
    const p = math.pow;
    const {x, y, z, w} = q;
    return math.matrix([
        [1 - 2 * p(y, 2) - 2 * p(z, 2), 2 * x * y - 2 * z * w, 2 * x * z + 2 * y * w],
        [2 * x * y + 2 * z * w, 1 - 2 * p(x, 2) - 2 * p(z, 2), 2 * y * z - 2 * x * w],
        [2 * x * z - 2 * y * w, 2 * y * z + 2 * x * w, 1 - 2 * p(x, 2) - 2 * p(y, 2)],
   ]);
}