import mat4 from 'gl-matrix-mat4';

import { getQuaternionForM4 } from '../../Physics/RungyKutta/RungyKutta';
import { getRotationDatas, getTranslationVector, getZooming } from '../Translation/Translation';
import { getAnimationQuaternion, getAnimationMatrix } from '../Animation/Animation';

export function TranslateMatrix(pMatrix, mMatrix, rotate, gl, type) {

    let mxProjection = Array(16); 

    mat4.perspective(mxProjection, 0.3, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    gl.uniformMatrix4fv(pMatrix, false, mxProjection);
    
    let mxModel = Array(16);

    const rot = getRotationDatas();

    mat4.identity(mxModel);
    mat4.translate(mxModel, mxModel, [0, 0, -7]);
    if(rotate) {
        mat4.translate(mxModel, mxModel, getTranslationVector());
    }
    mat4.rotateX(mxModel, mxModel, rot.x);
    mat4.rotateY(mxModel, mxModel, rot.y);
    if(type === 0 && rotate) {
        mat4.multiply(mxModel, mxModel, getAnimationMatrix());
    }
    if(type === 1 && rotate) {
        let quater = Array(16);
        let q = getAnimationQuaternion();
        mat4.fromQuat(quater, [q.x, q.y, q.z, q.w]);
        mat4.multiply(mxModel, mxModel, quater);
    }
    mat4.scale(mxModel, mxModel, getZooming());

    gl.uniformMatrix4fv(mMatrix, false, mxModel);
}