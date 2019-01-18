import { DiffPoints, SumPoints, Multiply, normalize, scalarMultiply, getVectorLength, crossMultiply } from "../../Helpers/Vectors";
import { getTHREE, getScene } from "../Animation/AnimationFrame";
import { getL2, getL1, getL3 } from "../../datas/CollectAndShareDatas";
import { getSmallCylinders, getCylinders, getLastPoint } from "./Cylinder";
import { getStart, setCylinderPositionAndAngle } from "../Draw/GenerateEffector";
import { DrawPuma } from "./DrawPuma";

export function updateEffectorAnglesCanvas2(alfa1, alfa2, alfa3, alfa4, alfa5, q) {

    const smallCylinders = getSmallCylinders();
    const cylinders = getCylinders();
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
export function updateEffectorAnglesCanvas1(alfa, beta, gamma, start, _animation) {

     const v1 = DiffPoints(getLastPoint({rx: alfa, ry: beta, rz: gamma, px: start.x, py: start.y, pz: start.z}, getL3()), start);

     let angle = {alfa: alfa, beta: beta, gamma: gamma};
     let point = SumPoints(start, v1);

    const p1 = {x: 0, y: 26, z: 0};
    const _normal = normalize(crossMultiply(p1, point));
    const _v = Multiply(normalize(crossMultiply(DiffPoints(start, point), _normal)), -1);
    const p2 = SumPoints(point, Multiply(normalize(_v), -getL2()));
    const p3 = point;
    const p4 = start;
    const q = DiffPoints(p2, p1);

   // const a1 = 

  //  DrawPuma(0, )
    if(_animation) {
        setCylinderPositionAndAngle(angle, start, 0);
    }

}
function setCylinderInPoint(cylinder, point, angle) {
    cylinder.position.x = point.x;
    cylinder.position.y = point.y;
    cylinder.position.z = point.z;

    cylinder.rotation.x = angle.x;
    cylinder.rotation.y = angle.y;
    cylinder.rotation.z = angle.z;
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