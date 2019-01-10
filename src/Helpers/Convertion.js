export function radiansToDegrees(val) {
    return parseInt((val * 180) / Math.PI, 10);
}
export function degreesToRadians(val) {
    return (val * Math.PI) / 180;
}