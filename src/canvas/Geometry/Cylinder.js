import mat4 from 'gl-matrix-mat4';

import { normalize } from '../../Helpers/Vectors';
import { getScene, getTHREE } from '../Animation/AnimationFrame';

const cylinders = [];
const smallCylinders = [];
let sphere;
let lastPosition = {x: 0, y: 0, z: 0};
let lastRotation = {x: 0, y: 0, z: 0};
export function getLastPosition() {
    return lastPosition;
}
export function addSphere(i, pos) {
    const THREE = getTHREE();
    const scene = getScene(i);
    const geometry = new THREE.SphereGeometry( 5, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = pos.x;
    sphere.position.y = pos.y;
    sphere.position.z = pos.z;
    scene.add( sphere );
}
export function getLastRotation() {
    return lastRotation;
}
export function addCylinder(i, position, rotation, len) {
    const THREE = getTHREE();
    const geometry = new THREE.CylinderGeometry( 2, 2, len ? len : 30, 32 );
    const material = new THREE.MeshPhongMaterial({color: 0x0000ff} );
    const cylinder = new THREE.Mesh( geometry, material );

    cylinder.position.x = position.x;
    cylinder.position.y = position.y;
    cylinder.position.z = position.z;

    cylinder.rotation.x = rotation.x;
    cylinder.rotation.y = rotation.y;
    cylinder.rotation.z = rotation.z;
    cylinders.push(cylinder);
    return cylinder;
}
export function addSmallCylinder(i, position, rotation) {
    const THREE = getTHREE();
    const scene = getScene(i);
    const geometry = new THREE.CylinderGeometry( 3, 3, 5, 32 );
    const material = new THREE.MeshPhongMaterial({color: 0xffff00} );
    const cylinder = new THREE.Mesh( geometry, material );

    addPosition(position);
    addRotation(rotation);

    cylinder.position.x = position.x;
    cylinder.position.y = position.y;
    cylinder.position.z = position.z;

    cylinder.rotation.x = rotation.x;
    cylinder.rotation.y = rotation.y;
    cylinder.rotation.z = rotation.z;

    smallCylinders.push(cylinder);
    return cylinder;
}
export function getAllCylinders() {
    return cylinders;
}
export function clearCylinderParameters() {
    lastPosition = {x: 0, y: 0, z: 0};
    lastRotation = {x: 0, y: 0, z: 0};   
}
function addPosition(position) {
    if(!position) return;
    lastPosition.x += position.x;
    lastPosition.y += position.y;
    lastPosition.z += position.z;
}
function addRotation(rotation) {
    if(!rotation) return;
    lastRotation.x += rotation.x;
    lastRotation.y += rotation.y;
    lastRotation.z += rotation.z;
}
export function getLastPoint(parameters, l) {

    let _matrix = mat4.create();
    _matrix = mat4.rotateX(mat4.create(), _matrix, parameters.rx);
    _matrix = mat4.rotateY(mat4.create(), _matrix, parameters.ry);
    _matrix = mat4.rotateZ(mat4.create(), _matrix, parameters.rz);

    let versor = {x: 0, y: 1, z: 0};
    versor = normalize(versor);
    let versorMatrix = mat4.create();
    versorMatrix[0] = versor.x;
    versorMatrix[1] = versor.y;
    versorMatrix[2] = versor.z;

    versorMatrix = mat4.multiply(versorMatrix, _matrix, versorMatrix);
    return{
        x: parameters.px - (l) * versorMatrix[0],
        y: parameters.py - (l) * versorMatrix[1],
        z: parameters.pz - (l) * versorMatrix[2]
    };
}
export function getSmallCylinders() {
    return smallCylinders;
}
export function getCylinders() {
    return cylinders;
}