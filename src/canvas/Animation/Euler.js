import mat4 from 'gl-matrix-mat4';

export function EulerLerp(alfa, beta, gamma, t, deltaAngle) {
    const all = alfa + beta + gamma;
    const Rz = mat4.create();
    const Ry = mat4.create();
    if(t < (alfa / all) || t > (alfa + beta) / all) {
        Rz[0] = Math.cos(deltaAngle);
        Rz[1] = -Math.sin(deltaAngle);
        Rz[4] = Math.sin(deltaAngle);
        Rz[5] = Math.cos(deltaAngle);
        return Rz;
    }
    if(t <= (alfa + beta) / all) {
        Ry[0] = Math.cos(deltaAngle);
        Ry[2] = Math.sin(deltaAngle);
        Ry[8] = -Math.sin(deltaAngle);
        Ry[10] = Math.cos(deltaAngle);
        return Ry;
    }
}