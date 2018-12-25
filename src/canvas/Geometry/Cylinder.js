import { getTHREE, getScene } from "../Animation/AnimationFrame";

const cylinders = [];
const smallCylinders = [];
let lastPosition = {x: 0, y: 0, z: 0};
let lastRotation = {x: 0, y: 0, z: 0};
export function addCylinder(i, position, rotation) {
    const THREE = getTHREE();
    const scene = getScene(i);
    const geometry = new THREE.CylinderGeometry( 2, 2, 30, 32 );
    const material = new THREE.MeshPhongMaterial({color: 0x0000ff} );
    const cylinder = new THREE.Mesh( geometry, material );

    addPosition(position);
    addRotation(rotation);

    cylinder.position.x = lastPosition.x;
    cylinder.position.y = lastPosition.y;
    cylinder.position.z = lastPosition.z;

    cylinder.rotation.x = lastRotation.x;
    cylinder.rotation.y = lastRotation.y;
    cylinder.rotation.z = lastRotation.z;

    scene.add( cylinder );
    cylinders.push(cylinder);
}
export function addSmallCylinder(i, position, rotation) {
    const THREE = getTHREE();
    const scene = getScene(i);
    const geometry = new THREE.CylinderGeometry( 3, 3, 5, 32 );
    const material = new THREE.MeshPhongMaterial({color: 0xffff00} );
    const cylinder = new THREE.Mesh( geometry, material );

    addPosition(position);
    addRotation(rotation);

    cylinder.position.x = lastPosition.x;
    cylinder.position.y = lastPosition.y;
    cylinder.position.z = lastPosition.z;

    cylinder.rotation.x = lastRotation.x;
    cylinder.rotation.y = lastRotation.y;
    cylinder.rotation.z = lastRotation.z;

    scene.add( cylinder );
    smallCylinders.push(cylinder);
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