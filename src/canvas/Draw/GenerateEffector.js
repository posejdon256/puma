import { getScene, getTHREE } from '../Animation/AnimationFrame';
import { getLastPosition } from '../Geometry/Cylinder';
import { DiffPoints, SumPoints, Multiply, normalize, crossMultiply } from '../../Helpers/Vectors';
import { getL3 } from '../../datas/CollectAndShareDatas';

const effectorArms = [];
export function updateEffector(rotations, position, vectorToBack, vectorToTop) {

    setCylinderPositionAndAngle(effectorArms[0], rotations[0], SumPoints(position, Multiply(normalize(vectorToBack), 10)));
    setCylinderPositionAndAngle(effectorArms[1], rotations[1], SumPoints(position, Multiply(normalize(vectorToTop), 10)));
    const cross = crossMultiply(vectorToBack, vectorToTop); 
    const rot = {
        x: Math.atan2(cross.z, cross.y),
        y: rotations[1].y,
        z: rotations[1].z
    }
  //  setCylinderPositionAndAngle(effectorArms[2], rot,  SumPoints(position, Multiply(normalize(cross), 10)));
}
function setCylinderPositionAndAngle(arm, rotation, position) {
    arm.rotation.x = rotation.x;
    arm.rotation.y = rotation.y;
    arm.rotation.z = rotation.z;

    arm.position.x = position.x;
    arm.position.y = position.y;
    arm.position.z = position.z;
}
export function generateEffector(i) {
    const lastPosition = getLastPosition();
    let position = {
        x: lastPosition.x + 15,
        y: lastPosition.y + 10,
        z: lastPosition.z
    };
    addCylinder(0xff0000, {x: 0, y: 0, z: 0}, position, i);
    position = {
        x: lastPosition.x + 15,
        y: lastPosition.y,
        z: lastPosition.z + 10
    };
    addCylinder(0x00ff00, {x: Math.PI/2, y: 0, z: 0}, position, i);
    // position = {
    //     x: lastPosition.x + 25,
    //     y: lastPosition.y,
    //     z: lastPosition.z
    // };
    // addCylinder(0xffff00, {x: 0, y: 0, z: Math.PI/2}, position, i);
}
function addCylinder(color, rotation, position, i) {
    const THREE = getTHREE();
    const scene = getScene(i);
    const geometry = new THREE.CylinderGeometry( 1, 1, 20, 32 );
    const material = new THREE.MeshPhongMaterial({color: color} );
    const cylinder = new THREE.Mesh( geometry, material );


    cylinder.position.x = position.x;
    cylinder.position.y = position.y;
    cylinder.position.z = position.z;

    cylinder.rotation.x = rotation.x;
    cylinder.rotation.y = rotation.y;
    cylinder.rotation.z = rotation.z;

    effectorArms.push(cylinder);
    scene.add( cylinder );
}
