let cameras = [],
    renderers = [],
    scenes = [],
    THREE;
export function getCamera(i) {
    return cameras[i];
}
export function getCameras(){
    return cameras;
}
export function setTHREE(_Three) {
    THREE = _Three;
}
export function getTHREE() {
    return THREE;
}
export function setCamera(_camera){
    cameras.push(_camera);
}
export function setScene(_scene){
    scenes.push(_scene);
}
export function setRenderer(_renderer) {
    renderers.push(_renderer)
}
export function getScene(i) {
    return scenes[i];
}
export function _animate() {
    requestAnimationFrame( _animate );
    renderers[0].render( scenes[0], cameras[0] );
    renderers[1].render( scenes[1], cameras[1] );
}