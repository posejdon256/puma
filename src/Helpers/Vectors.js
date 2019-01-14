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
export function normalize(v) {
    const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    };
}
export function SumPoints(p1, p2) {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y,
        z: p1.z + p2.z
    };
}
export function DiffPoints(p1, p2) {
    return { x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z};
}
export function Multiply(p, value) {
    return {
        x: p.x * value,
        y: p.y * value,
        z: p.z * value
    };
}