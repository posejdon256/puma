import mat4 from 'gl-matrix-mat4';

import { getL3, getPositionStart, getL2, getL1 } from '../../datas/CollectAndShareDatas';
import { crossMultiply, DiffPoints, Multiply, normalize, SumPoints, scalarMultiply, getVectorLength } from '../../Helpers/Vectors';
import { getStartAngles } from '../Animation/Animation';
import { getScene, getTHREE } from '../Animation/AnimationFrame';
import { updateEffector } from '../Draw/GenerateEffector';

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

export function updateEffectorAnglesCanvas1(alfa, beta, gamma, start) {
    const angles = [];
    const scene = getScene(0);

    const v1 = DiffPoints(getLastPoint({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}, getL3()), start);

    let angle = {x: alfa, y: beta, z: gamma};
    angles.push({
        x: angle.x,
        y: angle.y,
        z: angle.z
    });
    let point = SumPoints(start, Multiply(v1, -1/2));

    setCylinderInPoint(cylinders[3], point, angle);
    point = SumPoints(start, Multiply(v1, -1));

    setCylinderInPoint(smallCylinders[3], point, angle);

    const p1 = smallCylinders[1].position;
    const _normal = normalize(crossMultiply(smallCylinders[1].position, point));
    const _v = Multiply(normalize(crossMultiply(DiffPoints(start, point), _normal)), -1);
    const p2 = SumPoints(point, Multiply(normalize(_v), -getL2()));
    const p3 = point;
    const p4 = start;

    angle = {x: 0, y: Math.atan2(p3.x, p3.z), z:Math.PI/2};
    setCylinderInPoint(smallCylinders[1], p1, angle);
    setCylinderInPoint(smallCylinders[2], p2, angle); 
    scene.remove(cylinders[1]);
    const THREE = getTHREE();
    const geometry = new THREE.CylinderGeometry( 2, 2, parseInt(getVectorLength(DiffPoints(p2, p1)), 10), 32 );
    const material = new THREE.MeshPhongMaterial({color: 0x0000ff} );
    const cylinder = new THREE.Mesh( geometry, material );
    scene.add(cylinder);
    cylinders[1] = cylinder;

    angle = {x: 0, y: Math.atan2(p3.x, p3.z) - (Math.PI/2), z:  -Math.acos(scalarMultiply(normalize(p1), normalize(DiffPoints(p2, p1))))};  
    setCylinderInPoint(cylinders[1], SumPoints(p1, Multiply(DiffPoints(p2, p1), 1/2)), angle);

    let _angle = Math.acos(scalarMultiply(normalize(DiffPoints(p3, p2)), {x: 1, y: 0, z: 0}));
    console.log(_angle);
    if(_angle > Math.PI / 4) {
        angle.z -= Math.acos(scalarMultiply(normalize(DiffPoints(p2, p1)), normalize(DiffPoints(p3, p2))));
    } else {
        angle.z += Math.acos(scalarMultiply(normalize(DiffPoints(p2, p1)), normalize(DiffPoints(p3, p2))));
    }
    angles.push({
        x: angle.x,
        y: angle.y,
        z: angle.z
    });
    updateEffector(angles, start, v1, DiffPoints(p3, p2));
    setCylinderInPoint(cylinders[2], SumPoints(p2, Multiply(DiffPoints(p3, p2), 1/2)), angle);

}
function rotateVector(vector, axis, angle) {
    const THREE = getTHREE();
    const _vector = new THREE.Vector3( vector.x, vector.y, vector.z );
    let _axis;
    if(axis === "X") {
        _axis = new THREE.Vector3( 1, 0, 0 );
    } else if(axis === "Y") {
        _axis = new THREE.Vector3( 0, 1, 0 );
    } else {
        _axis = new THREE.Vector3( 0, 0, 1 );
    }
    const newVector = _vector.applyAxisAngle( _axis, angle );
    return {x: newVector.x, y: newVector.y, z: newVector.z};
}
export function updateEffectorAnglesCanvas2(alfa1, alfa2, alfa3, alfa4, alfa5, q) {
    const scene = getScene(1);
    const p0 = {x: 0, y: 0, z: 0};
    const p1 = SumPoints(p0, {x: 0, y: getL1() - 4, z: 0});
    const angle1 = {x: 0, y: alfa1, z: Math.PI/2};
    setCylinderInPoint(smallCylinders[5], p1, angle1);

    scene.remove(cylinders[5]);
    const THREE = getTHREE();
    const geometry = new THREE.CylinderGeometry( 2, 2, q, 32 );
    const material = new THREE.MeshPhongMaterial({color: 0x0000ff} );
    const cylinder = new THREE.Mesh( geometry, material );
    scene.add(cylinder);
    cylinders[5] = cylinder;

    let lastVector = rotateVector({x: 0, y: q / 2, z: 0}, "Y", alfa1);
    lastVector = rotateVector(lastVector, "Z", -alfa2);
    const p2rim = SumPoints(p1, lastVector);
    const angle2 = {x: 0, y: alfa1 - Math.PI/2, z: -alfa2};
    setCylinderInPoint(cylinders[5], p2rim, angle2);

    const p2 = SumPoints(p1, rotateVector({x: 0, y: q, z: 0}, "Z", -alfa2));
    setCylinderInPoint(smallCylinders[6], p2, angle1);

    lastVector = rotateVector({x: 0, y: getL2()/2, z: 0}, "Y", alfa1);
    lastVector = rotateVector(lastVector, "Z", -alfa2)
    lastVector = rotateVector(lastVector, "Z",   alfa3);
    const p3Prim = SumPoints(p2, lastVector);
    const angle3 = {x: 0, y: alfa1 - Math.PI/2, z: - alfa2 +alfa3};
    setCylinderInPoint(cylinders[6], p3Prim, angle3);

    lastVector = rotateVector({x: 0, y: getL2(), z: 0}, "Z", -alfa2)
    lastVector = rotateVector(lastVector, "Z",  alfa3);
    const p3 = SumPoints(p2, lastVector);
    setCylinderInPoint(smallCylinders[7], p3, SumPoints(angle3, {x: 0, y: 0, z: Math.PI/2}));

    lastVector = rotateVector({x: 0, y: getL3(), z: 0}, "Z", -alfa2);
    lastVector = rotateVector(lastVector, "Z", alfa3);
    lastVector = rotateVector(lastVector, "X", Math.PI/2 + alfa4);
   // lastVector = rotateVector(lastVector, "Y", -alfa4);
    const p4Prim = SumPoints(p3, Multiply(lastVector, 1/2));
    const angle4 = SumPoints(angle3, {x: Math.PI/2 + alfa4, y: 0, z: 0});
    setCylinderInPoint(cylinders[7], p4Prim, angle4);
}
function setCylinderInPoint(cylinder, point, angle) {
    cylinder.position.x = point.x;
    cylinder.position.y = point.y;
    cylinder.position.z = point.z;

    cylinder.rotation.x = angle.x;
    cylinder.rotation.y = angle.y;
    cylinder.rotation.z = angle.z;
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