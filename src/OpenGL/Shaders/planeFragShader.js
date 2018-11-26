let fragmentShader  = `
precision mediump float;
  
void main() {
  gl_FragColor = vec4(100.0, 255.0, 255.0, 0.5) ;
}`;
export function getFragmentShaderPlane() {
  return fragmentShader;
}