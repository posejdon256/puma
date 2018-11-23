import { getglCtx } from "../../OpenGL/InitOpenGL";
import { getRotationDatas, getTranslationVector, getZooming } from "../Translation/Translation";
import mat4 from 'gl-matrix-mat4';
import { getQuaternion } from "../../Physics/RungyKutta/RungyKutta";

export function TranslateMatrix(pMatrix, mMatrix, rotate) {

    const gl = getglCtx();

    let mxProjection = Array(16); 

    mat4.perspective(mxProjection, 0.3, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    gl.uniformMatrix4fv(pMatrix, false, mxProjection);
    
    let mxModel = Array(16);

    const rot = getRotationDatas();

    mat4.identity(mxModel);
    mat4.translate(mxModel, mxModel, [0, 0, -7]);
    mat4.translate(mxModel, mxModel, getTranslationVector());
    mat4.rotateX(mxModel, mxModel, rot.x);
    mat4.rotateY(mxModel, mxModel, rot.y);
    if(rotate) {
        let quater = Array(16);
        mat4.fromQuat(quater, getQuaternion());
        mat4.multiply(mxModel, mxModel, quater);
    }
    mat4.translate(mxModel, mxModel, [-0.5, -0.5, -0.5]);
    mat4.scale(mxModel, mxModel, getZooming());

    gl.uniformMatrix4fv(mMatrix, false, mxModel);
}