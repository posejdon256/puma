let vertexShader =  `
attribute vec3 position;

uniform mat4 model;
uniform mat4 projection;
uniform vec4 mycolor;

varying vec4 fragcolor;

void main() {
    gl_Position = vec4(projection * model * vec4(position, 1.0));
    fragcolor = mycolor;
  }`;
  export function getVertexShaderLine() {
      return vertexShader;
  }