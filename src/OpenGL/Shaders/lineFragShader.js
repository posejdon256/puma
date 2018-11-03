let fragmentShader  = `
precision mediump float;
  
void main() {
  gl_FragColor = vec4(255.0, 255.0, 255.0, 1) ;
}`;
export function getFragmentShaderLine() {
  return fragmentShader;
}