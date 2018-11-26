import math from 'mathjs';
export function rotateByQuternionQ(q) {
    const p = math.pow;
    const {x, y, z, w} = q;
    const out = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    const x2 = x + x,
    y2 = y + y,
    z2 = z + z,

    xx = x * x2,
    yx = y * x2,
    yy = y * y2,
    zx = z * x2,
    zy = z * y2,
    zz = z * z2,
    wx = w * x2,
    wy = w * y2,
    wz = w * z2;

out[0][0] = 1 - yy - zz;
out[0][1] = yx + wz;
out[0][2] = zx - wy;

out[1][0] = yx - wz;
out[1][1] = 1 - xx - zz;
out[1][2] = zy + wx;

out[2][0] = zx + wy;
out[2][1] = zy - wx;
out[2][2] = 1 - xx - yy;
return math.transpose(math.matrix(out));
}