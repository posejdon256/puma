import { quaterion } from "../../Helpers/Quaternion/quaternion";

export function Lerp(Q, S, t) {
    const D = Q.diff(S).norm();
    return Q.add(D.mulScalar(t)).norm();
}
export function Slerp(Q, S, t) {
    const alfa = Math.acos(Q.x * S.x + Q.y * S.y + Q.z * S.z + Q.w * S.w);
    const Qs = Q.mulScalar(Math.sin((1 - t) * alfa) / Math.sin(alfa));
    const Ss = S.mulScalar(Math.sin(t * alfa) / Math.sin(alfa));
    return Qs.add(Ss);   
}