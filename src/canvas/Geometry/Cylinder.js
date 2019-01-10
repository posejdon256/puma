import mat4 from 'gl-matrix-mat4';

import { getL3 } from '../../datas/CollectAndShareDatas';
import { degreesToRadians } from '../../Helpers/Convertion';
import { normalize } from '../../Helpers/Vectors';
import { getStartAngles } from '../Animation/Animation';
import { getScene, getTHREE } from '../Animation/AnimationFrame';

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
export function updateEffectorAngles() {
    const {alfa, beta, gamma} = getStartAngles();
    cylinders[3].rotation.x = alfa;
    cylinders[3].rotation.y = beta;
    cylinders[3].rotation.z = gamma;

    cylinders[7].rotation.x = alfa;
    cylinders[7].rotation.y = beta;
    cylinders[7].rotation.z = gamma;

    const v1 = DiffPoints(getLastPoint(smallCylinders[3], {rx: alfa, ry: beta, rz: gamma, px: cylinders[3].position.x, py: cylinders[3].position.y, pz: cylinders[3].position.z}, getL3() * 30),
    {x: smallCylinders[3].position.x, y: smallCylinders[3].position.y, z: smallCylinders[3].position.z});
    const v2 = {x: smallCylinders[2].position.x - smallCylinders[3].position.x,
        y: undefined,
        z: undefined};


    setCylinderAllParameters(smallCylinders[3], {rx: alfa, ry: beta, rz: gamma, px: cylinders[3].position.x, py: cylinders[3].position.y, pz: cylinders[3].position.z}, getL3() * 30);
    setCylinderAllParameters(smallCylinders[7], {rx: alfa, ry: beta, rz: gamma, px: cylinders[7].position.x, py: cylinders[7].position.y, pz: cylinders[7].position.z}, getL3() * 30);

    const len1 = smallCylinders[3].position.z - smallCylinders[1].position.z;
    const len2 = smallCylinders[3].position.x - smallCylinders[1].position.x;
    let z = degreesToRadians(len1);
    let x = degreesToRadians(len2);
    const alfa1 = Math.atan2(z, x);
    smallCylinders[1].rotation.z = alfa1;

    cylinders[1].rotation.y = alfa1;
    cylinders[1].position.x = smallCylinders[1].position.x + (0.25 * len2);
    cylinders[1].position.z = smallCylinders[1].position.z + (0.25 * len1);

    smallCylinders[5].rotation.z = alfa1;

    cylinders[5].rotation.y = alfa1;
    cylinders[5].position.x = smallCylinders[5].position.x + (0.25 * len2);
    cylinders[5].position.z = smallCylinders[5].position.z + (0.25 * len1);

    smallCylinders[2].rotation.z = -alfa1;
    smallCylinders[2].position.x = smallCylinders[1].position.x + (0.5 * len2);
    smallCylinders[2].position.z = smallCylinders[1].position.z + (0.5 * len1);

    cylinders[2].rotation.y = -alfa1;
    cylinders[2].position.x = smallCylinders[2].position.x + (0.25 * len2);
    cylinders[2].position.z = smallCylinders[2].position.z + (0.25 * len1);

    smallCylinders[6].rotation.z = -alfa1;
    smallCylinders[6].position.x = smallCylinders[5].position.x + (0.5 * len2);
    smallCylinders[6].position.z = smallCylinders[5].position.z + (0.5 * len1);

    cylinders[6].rotation.y = -alfa1;
    cylinders[6].position.x = smallCylinders[6].position.x + (0.25 * len2);
    cylinders[6].position.z = smallCylinders[6].position.z + (0.25 * len1);

    v2.y = (v2.x * v1.y) / v1.x;
    v2.z = (v2.x * v1.z) / v1.x;
    smallCylinders[2].position.x = smallCylinders[3].position.x + v2.x;
    smallCylinders[2].position.y = smallCylinders[3].position.y + v2.y;
    smallCylinders[2].position.z = smallCylinders[3].position.z + v2.z;

    //clearCylinderParameters();
    
}
function setCylinderAllParameters(cylinder, parameters, l) {
    cylinder.rotation.x = parameters.rx;
    cylinder.rotation.y = parameters.ry;
    cylinder.rotation.z = (3.14 / 2) + parameters.rz;

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

    cylinder.position.x = parameters.px + (l / 2) * versorMatrix[0];
    cylinder.position.y = parameters.py + (l / 2) * versorMatrix[1];
    cylinder.position.z = parameters.pz + (l / 2) * versorMatrix[2];
}
function getLastPoint(cylinder, parameters, l) {

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
        x: parameters.px - (l / 2) * versorMatrix[0],
        y: parameters.py - (l / 2) * versorMatrix[1],
        z: parameters.pz - (l / 2) * versorMatrix[2]
    };
}
function DiffPoints(p1, p2) {
    return { x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z};
}