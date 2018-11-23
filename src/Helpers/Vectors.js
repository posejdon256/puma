export function getVectorLength(p) {
    return Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2) + Math.pow(p.z, 2));
}
export function crossMultiply(v1, v2) {
    // [ a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1 ]
    return {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
    }
}
export function scalarMultiply(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}