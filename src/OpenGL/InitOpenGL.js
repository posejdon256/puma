import { getMainVertexShader } from "./Shaders/vertShader"
import { getMainFragmentShader } from "./Shaders/fragShader";

const canvasesSettings = [];
export function getSettings() {
  return canvasesSettings;
}
export function initWebGL(canvas) {
      let settings = {};
      settings.gl = null;
      //Pobieranie kontekstu
      settings.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      settings.gl.viewportWidth = canvas.width;
      settings.gl.viewportHeight = canvas.height;

      initShaders(settings);

      settings.gl.useProgram(settings.shaderProgram);
      settings.modelMx = settings.gl.getUniformLocation(settings.shaderProgram, "model");
      settings.projectionMx = settings.gl.getUniformLocation(settings.shaderProgram, "projection");

      initBuffers(settings);
    
    // If we don't have a GL context, give up now
    if (!settings.gl) {
      alert("Unable to initialize WebGL. Your browser may not support it.");
      settings.gl = null;
    }
    
    return settings.gl;
  }
  function initShaders(settings) {
    // Try to grab the standard context. If it fails, fallback to experimental.
    //Pobieranie shaderów jako tekstu
    let vertexShaderText =  getMainVertexShader();
    let fragmentShaderText = getMainFragmentShader();

    settings.vShader = CreateShader( settings.gl, vertexShaderText, settings.gl.VERTEX_SHADER );
    settings.fShader = CreateShader( settings.gl, fragmentShaderText, settings.gl.FRAGMENT_SHADER );

    //tworze program shaderowy
    settings.shaderProgram = settings.gl.createProgram();

    settings.gl.attachShader(settings.shaderProgram, settings.vShader);
    settings.gl.attachShader(settings.shaderProgram, settings.fShader);
    
    settings.gl.linkProgram(settings.shaderProgram);
    
    canvasesSettings.push(settings);
    return settings;

  }
  function initBuffers(settings) {
      //init buffers
    settings.vertexBuffer = settings.gl.createBuffer();
    settings.indexBuffer = settings.gl.createBuffer();
    settings.normalBuffer = settings.gl.createBuffer();
  }
  export function addData(vert, ind, norm, settings) {
    const {gl, vertexBuffer, normalBuffer, indexBuffer} = settings;
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