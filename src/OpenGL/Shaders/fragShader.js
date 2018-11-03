let fragmentShader  = `
precision mediump float;
varying vec3 vNormal;
varying vec3 vPos;
  
void main() {
  vec3 ambient = vec3(10.0 / 255.0, 10.0 / 255.0, 10.0 / 255.0);
  vec3 diffuse = vec3(98.0 / 255.0, 6.0 / 255.0, 238.0 / 255.0);
  float ambientSaturation = 1.0;
  float diffSaturation = 0.7;
  vec3 light = vec3(-5.0, -5.0, -5.0);
  vec3 fromLight = normalize(light - vPos);
  float diff = max(dot(vNormal, fromLight), 0.0);
  vec3 Ia = ambient * ambientSaturation;
  vec3 Id = diffuse * diff;
  //gl_FragColor = texture2D(uSampler, ((vTextureCoord )  + (1.5, 1.5))/ 3.0) * 0.7 +  vec4(Ia + Id, 1) * 0.3;
  gl_FragColor = vec4(Ia + Id, 1) ;
}`;
export function getMainFragmentShader() {
  return fragmentShader;
}