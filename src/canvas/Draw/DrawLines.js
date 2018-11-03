import {
    addData,
    getglCtx,
    getModelMxLine,
    getProjectionMxLine,
    getShaderProgramLines,
    getVertexBuffer,
} from '../../OpenGL/InitOpenGL';
import { TranslateMatrix } from '../TranslateMatrix/TranslateMatrix';
import { getLinesIndices, getLinesVertices } from './Lines';

export function DrawLines() {
    const gl = getglCtx();
    const shaderProgram = getShaderProgramLines();
    const vb = getVertexBuffer();
    const indices = getLinesIndices();
    if(indices.length === 0) {
        return;
    }
    gl.disable(gl.DEPTH_TEST);  

    gl.useProgram(shaderProgram);
    let coord = gl.getAttribLocation(shaderProgram, "position");

    // Point an attribute to the currently bound VBO
    gl.bindBuffer(gl.ARRAY_BUFFER, vb);
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    addData(getLinesVertices(), getLinesIndices());
    TranslateMatrix(getProjectionMxLine(), getModelMxLine());

    //cleanScrean();

    //var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vb);
    gl.drawArrays(gl.LINES, 0, indices.length);
}
