import { TranslateMatrix } from '../TranslateMatrix/TranslateMatrix';
import { getLinesVerticesTrayectory, getLinesIndicesGravitation, getLinesIndicesDiagonal, getLinesVerticesDiagonal, getLinesVerticesGraviatation, getLinesIndicesTrayectory, getLinesIndicesXYZ, getLinesVerticesX, getLinesVerticesY, getLinesVerticesZ } from './Lines';
import { _getGravitation, _getDagonalSeen } from '../../datas/CollectAndShareDatas';
import { getSettings, addData } from '../../OpenGL/InitOpenGL';

export function DrawLines() {
    const settings = getSettings();
    for(let i = 0; i < settings.length; i ++) {
        _DrawLines(settings[i], i);
    }
}
function _DrawLines(set, type) {
    const gl = set.gl;
    const shaderProgram = set.shaderProgramLine;
    const vb = set.vertexBuffer;
    let indices = getLinesIndicesTrayectory();
    gl.enable(gl.DEPTH_TEST);  

    gl.useProgram(shaderProgram);
    let coord = gl.getAttribLocation(shaderProgram, "position");

    // Point an attribute to the currently bound VBO
    gl.bindBuffer(gl.ARRAY_BUFFER, vb);
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    let u_colorLocation = gl.getUniformLocation(shaderProgram, "mycolor");
    gl.uniform4f(u_colorLocation, 0, 1, 1, 1);

    if(indices.length > 0) {
        addData(getLinesVerticesTrayectory(), getLinesIndicesTrayectory(), undefined, set);
        TranslateMatrix(set.projectionMxLine, set.modelMxLine, false, gl, type);

        //var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vb);
        gl.drawArrays(gl.LINES, 0, indices.length);
    }
    if(_getDagonalSeen()) {

        //X
        u_colorLocation = gl.getUniformLocation(shaderProgram, "mycolor");
        gl.uniform4f(u_colorLocation, 0, 0, 1, 1);

        indices = getLinesIndicesXYZ();
        addData(getLinesVerticesX(), indices, undefined, set);
        TranslateMatrix(set.projectionMxLine, set.modelMxLine, true, gl, type);
        gl.bindBuffer(gl.ARRAY_BUFFER, vb);
        gl.drawArrays(gl.LINES, 0, indices.length);

        //Y
        u_colorLocation = gl.getUniformLocation(shaderProgram, "mycolor");
        gl.uniform4f(u_colorLocation, 0, 1, 0, 1);

        indices = getLinesIndicesXYZ();
        addData(getLinesVerticesY(), indices, undefined, set);
        TranslateMatrix(set.projectionMxLine, set.modelMxLine, true, gl, type);
        gl.bindBuffer(gl.ARRAY_BUFFER, vb);
        gl.drawArrays(gl.LINES, 0, indices.length);

        //Z
        u_colorLocation = gl.getUniformLocation(shaderProgram, "mycolor");
        gl.uniform4f(u_colorLocation, 1, 0, 0, 1);

        indices = getLinesIndicesXYZ();
        addData(getLinesVerticesZ(), indices, undefined, set);
        TranslateMatrix(set.projectionMxLine, set.modelMxLine, true, gl, type);
        gl.bindBuffer(gl.ARRAY_BUFFER, vb);
        gl.drawArrays(gl.LINES, 0, indices.length);
    }
}
