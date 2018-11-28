import {
    addData,
    getglCtx,
    getModelMxLine,
    getProjectionMxLine,
    getShaderProgramLines,
    getVertexBuffer,
} from '../../OpenGL/InitOpenGL';
import { TranslateMatrix } from '../TranslateMatrix/TranslateMatrix';
import { getLinesVerticesTrayectory, getLinesIndicesGravitation, getLinesIndicesDiagonal, getLinesVerticesDiagonal, getLinesVerticesGraviatation, getLinesIndicesTrayectory } from './Lines';
import { _getGravitation, _getDagonalSeen } from '../../datas/CollectAndShareDatas';

export function DrawLines() {
    const gl = getglCtx();
    const shaderProgram = getShaderProgramLines();
    const vb = getVertexBuffer();
    let indices = getLinesIndicesTrayectory();
    gl.disable(gl.DEPTH_TEST);  

    gl.useProgram(shaderProgram);
    let coord = gl.getAttribLocation(shaderProgram, "position");

    // Point an attribute to the currently bound VBO
    gl.bindBuffer(gl.ARRAY_BUFFER, vb);
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    if(indices.length > 0) {
        addData(getLinesVerticesTrayectory(), getLinesIndicesTrayectory());
        TranslateMatrix(getProjectionMxLine(), getModelMxLine(), false);

        //var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vb);
        gl.drawArrays(gl.LINES, 0, indices.length);
    }

    if(_getGravitation()) {
        indices = getLinesIndicesGravitation();
        addData(getLinesVerticesGraviatation(), indices);
        TranslateMatrix(getProjectionMxLine(), getModelMxLine(), false);

        //var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vb);
        gl.drawArrays(gl.LINES, 0, indices.length);
    }
    if(_getDagonalSeen()) {
        indices = getLinesIndicesDiagonal();
        addData(getLinesVerticesDiagonal(), indices);
        TranslateMatrix(getProjectionMxLine(), getModelMxLine(), true);

        //var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vb);
        gl.drawArrays(gl.LINES, 0, indices.length);
    }
}
