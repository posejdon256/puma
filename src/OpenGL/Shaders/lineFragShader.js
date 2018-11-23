let fragmentShader  = `
precision mediump float;
  
void main() {
  gl_FragColor = vec4(255.0, 0.0, 0.0, 1.0) ;
}`;
export function getFragmentShaderLine() {
  return fragmentShader;
}