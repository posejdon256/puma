import { getglCtx, getShaderProgram, getVertexBuffer, getProjectionMx, getModelMx, getNormalBuffer, addData } from "../OpenGL/InitOpenGL";
import { getCubeIndices, getCubeVertices, getNormals } from "./datas/Cube";
import { cleanScrean } from "../OpenGL/Clear";
import { TranslateMatrix } from "./TranslateMatrix/TranslateMatrix";

export function DrawCube() {
    const gl = getglCtx();
    const shaderProgram = getShaderProgram();
    const nb = getNormalBuffer();
    const vb = getVertexBuffer();
    const indices = getCubeIndices();

    gl.useProgram(shaderProgram);
    let coord = gl.getAttribLocation(shaderProgram, "position");
    let normal = gl.getAttribLocation(shaderProgram, "normal");

    // Point an attribute to the currently bound VBO
    gl.bindBuffer(gl.ARRAY_BUFFER, vb);
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, nb);
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normal);

    addData(getCubeVertices(), getCubeIndices(), getNormals());
    TranslateMatrix(getProjectionMx(), getModelMx());

    cleanScrean();

    //var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vb);
    gl.drawArrays(gl.TRIANGLES, 0, indices.length);
}
