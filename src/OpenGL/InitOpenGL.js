import { getMainVertexShader } from "./Shaders/vertShader"
import { getMainFragmentShader } from "./Shaders/fragShader";
import { getCubeVertices, getCubeIndices, getNormals } from "../canvas/datas/Cube";
import { getVertexShaderLine } from "./Shaders/lineVertShader";
import { getFragmentShaderLine } from "./Shaders/lineFragShader";
import { getVertexShaderPlane } from "./Shaders/planeVertShader";
import { getFragmentShaderPlane } from "./Shaders/planeFragShader";

let fShader;
let vShader;

let fShaderLine;
let vShaderLine;

let fShaderPlane;
let vShaderPlane;

let modelMx;
let projectionMx;

let modelMxLine;
let projectionMxLine;

let modelMxPlane;
let projectionMxPlane;

let vertexBuffer;
let indexBuffer;
let normalBuffer;

let shaderProgram;
let shaderProgramLine;
let shaderProgramPlane;

let gl;

export function getIndexBuffer() {
  return indexBuffer;
}
export function getVertexBuffer() {
  return vertexBuffer;
}
export function getNormalBuffer() {
  return normalBuffer;
}
export function getModelMx(){
  return modelMx;
}
export function getProjectionMx(){
  return projectionMx;
}
export function getModelMxLine() {
  return modelMxLine;
}
export function getModelMxPlane() {
  return modelMxPlane;
}
export function getProjectionMxLine() {
  return projectionMxLine;
}
export function getProjectionMxPlane() {
  return projectionMxPlane;
}
export function getShaderProgram() {
  return shaderProgram;
}
export function getShaderProgramLines() {
  return shaderProgramLine;
}
export function getShaderProgramPlane() {
  return shaderProgramPlane;
}
export function getFragmentShader() {
  return fShader;
}
export function getVertexShader() {
  return vShader;
}
export function getglCtx() {
    return gl;
}
export function initWebGL(canvas) {
      gl = null;
      //Pobieranie kontekstu
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;

      initShaders(gl);

      gl.useProgram(shaderProgram);
      modelMx = gl.getUniformLocation(shaderProgram, "model");
      projectionMx = gl.getUniformLocation(shaderProgram, "projection");

      gl.useProgram(shaderProgramLine);
      modelMxLine = gl.getUniformLocation(shaderProgramLine, "model");
      projectionMxLine = gl.getUniformLocation(shaderProgramLine, "projection");

      gl.useProgram(shaderProgramPlane);
      modelMxPlane = gl.getUniformLocation(shaderProgramPlane, "model");
      projectionMxPlane = gl.getUniformLocation(shaderProgramPlane, "projection");

      initBuffers(gl);
    
    // If we don't have a GL context, give up now
    if (!gl) {
      alert("Unable to initialize WebGL. Your browser may not support it.");
      gl = null;
    }
    
    return gl;
  }
  function initShaders(gl) {
    // Try to grab the standard context. If it fails, fallback to experimental.
    //Pobieranie shaderów jako tekstu
    let vertexShaderText =  getMainVertexShader();
    let fragmentShaderText = getMainFragmentShader();

    let vertexShaderTextLine =  getVertexShaderLine();
    let fragmentShaderTextLine = getFragmentShaderLine();

    let vertexShaderTextPlane =  getVertexShaderPlane();
    let fragmentShaderTextPlane = getFragmentShaderPlane();

    vShader = CreateShader( gl, vertexShaderText, gl.VERTEX_SHADER );
    fShader = CreateShader( gl, fragmentShaderText, gl.FRAGMENT_SHADER );

    vShaderLine = CreateShader( gl, vertexShaderTextLine, gl.VERTEX_SHADER );
    fShaderLine = CreateShader( gl, fragmentShaderTextLine, gl.FRAGMENT_SHADER );

    vShaderPlane = CreateShader( gl, vertexShaderTextPlane, gl.VERTEX_SHADER );
    fShaderPlane = CreateShader( gl, fragmentShaderTextPlane, gl.FRAGMENT_SHADER );
    //tworze program shaderowy
    shaderProgram = gl.createProgram();
    shaderProgramLine = gl.createProgram();
    shaderProgramPlane = gl.createProgram();

    gl.attachShader(shaderProgram, vShader);
    gl.attachShader(shaderProgram, fShader);

    gl.attachShader(shaderProgramLine, vShaderLine);
    gl.attachShader(shaderProgramLine, fShaderLine);

    gl.attachShader(shaderProgramPlane, vShaderPlane);
    gl.attachShader(shaderProgramPlane, fShaderPlane);

    gl.linkProgram(shaderProgram);
    gl.linkProgram(shaderProgramLine);
    gl.linkProgram(shaderProgramPlane);

  }
  function initBuffers(gl) {
      //init buffers
    vertexBuffer = gl.createBuffer();
    indexBuffer = gl.createBuffer();
    normalBuffer = gl.createBuffer();
    addData(getCubeVertices(), getCubeIndices(), getNormals());
  }
  export function addData(vert, ind, norm) {
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.STATIC_DRAW);

    if(norm) {
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norm), gl.STATIC_DRAW);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(ind), gl.STATIC_DRAW);
  }
  export  function CreateShader(gl, source, type) {

    var shader = gl.createShader( type );
    gl.shaderSource( shader, source );
    gl.compileShader( shader );
    if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
    
        var info = gl.getShaderInfoLog( shader );
        throw "Could not compile WebGL program. \n\n" + info;
      }
    return shader
  }