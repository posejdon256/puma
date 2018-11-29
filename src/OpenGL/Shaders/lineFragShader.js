let fragmentShader  = `
precision mediump float;
varying vec4 fragcolor;
void main() {
  gl_FragColor = fragcolor;
}`;
export function getFragmentShaderLine() {
  return fragmentShader;
}