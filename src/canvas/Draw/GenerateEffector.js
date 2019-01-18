import { getScene, getTHREE } from '../Animation/AnimationFrame';
import { updateEffectorAnglesCanvas1 } from '../Geometry/CountInverseKinematics';

const effectorArms = [];
const startEffector = [{
    x: 60,
    y: 0,
    z: 0,
    alfa: 0,
    beta: 0,
    gamma: 0
}, {
    x: 60,
    y: 0,
    z: 0,
    alfa: 0,
    beta: 0,
    gamma: 0
}];
let objectGroups = [];
export function getStart(i) {
    return startEffector[i];
}
export function getEnd(i) {
    return endEffector[i];
}
const endEffector = [{
    x: 60,
    y: 0,
    z: 0,
    alfa: 0,
    beta: 0,
    gamma: 0
}, {
    x: 60,
    y: 0,
    z: 0,
    alfa: 0,
    beta: 0,
    gamma: 0
}];
export function updateEffectorStart(configuration, event) {
    switch(configuration) {
        case 87: //W
           startEffector[0].y ++;
           startEffector[1].y ++;
        break;
        case 83: //S
            startEffector[0].y --;
            startEffector[1].y --;
            break;
        case 65: //A
            startEffector[0].x --;
            startEffector[1].x --;
            break;
        case 68: //D
            startEffector[0].x ++;
            startEffector[1].x ++;
            break;
        case 70: //F
            startEffector[0].z ++;
            startEffector[1].z ++;
            break;
        case 66: //B
            startEffector[0].z --;
            startEffector[1].z --;
            break;
        default:
            break;
    }
    if(configuration.alfa !== undefined) {
        startEffector[0].alfa = configuration.alfa;
        startEffector[1].alfa = configuration.alfa;
    } else if(configuration.beta !== undefined) {
        startEffector[0].beta = configuration.beta;
        startEffector[1].beta = configuration.beta;
    } else if(configuration.gamma !== undefined) {
        startEffector[0].gamma = configuration.gamma;
        startEffector[1].gamma = configuration.gamma;
    }
    setCylinderPositionAndAngle(startEffector[0], startEffector[0], 0);
    setCylinderPositionAndAngle(startEffector[0], startEffector[0], 2);

    updateEffectorAnglesCanvas1(startEffector[0].alfa, startEffector[0].beta, startEffector[0].gamma, startEffector[0], false);
}
export function updateEffectorEnd(configuration) {
    switch(configuration) {
        case 87: //W
           endEffector[0].y ++;
           endEffector[1].y ++;
        break;
        case 83: //S
            endEffector[0].y --;
            endEffector[1].y --;
            break;
        case 65: //A
            endEffector[0].x --;
            endEffector[1].x --;
            break;
        case 68: //D
            endEffector[0].x ++;
            endEffector[1].x ++;
            break;
        case 70: //F
            endEffector[0].z ++;
            endEffector[1].z ++;
            break;
        case 66: //B
            endEffector[0].z --;
            endEffector[1].z --;
            break;
        default:
            break;
    }

    if(configuration.alfa !== undefined){
        endEffector[0].alfa = configuration.alfa;
        endEffector[1].alfa = configuration.alfa;
    } else if(configuration.beta !== undefined) {
        endEffector[0].beta = configuration.beta;
        endEffector[1].beta = configuration.beta;
    } else if(configuration.gamma !== undefined) {
        endEffector[0].gamma = configuration.gamma;
        endEffector[1].gamma = configuration.gamma;
    }
    setCylinderPositionAndAngle(endEffector[0],  endEffector[0], 1);
    setCylinderPositionAndAngle(endEffector[0],  endEffector[0], 3);
}
export function setCylinderPositionAndAngle(rotation, position, i) {
    objectGroups[i].rotation.x = rotation.alfa;
    objectGroups[i].rotation.y = rotation.beta;
    objectGroups[i].rotation.z = rotation.gamma;

    objectGroups[i].position.x = position.x;
    objectGroups[i].position.y = position.y;
    objectGroups[i].position.z = position.z;
}
export function generateEffector(i) {

    const scene = getScene(i);
    const THREE = getTHREE();
    objectGroups.push(new THREE.Object3D());
    objectGroups.push(new THREE.Object3D());
    objectGroups[i * 2].position.set( startEffector[i].x, startEffector[i].y, startEffector[i].z);
    objectGroups[i * 2 + 1].position.set( startEffector[i].x, startEffector[i].y, startEffector[i].z);
    let position = {
        x: 0,
        y: 0,
        z: 0
    };
    addCylinder(0xff0000, {x: 0, y: -Math.PI/2, z: 0}, position, i, {x: 0, y: 10, z: 0}, i * 2);
    addCylinder(0xff0000, {x: 0, y: -Math.PI/2, z: 0}, position, i, {x: 0, y: 10, z: 0}, i * 2 + 1);
    addCylinder(0x00ff00, {x: Math.PI/2, y: 0, z: 0}, position, i, {x: 0, y: 10, z: 0}, i * 2);
    addCylinder(0x00ff00, {x: Math.PI/2, y: 0, z: 0}, position, i, {x: 0, y: 10, z: 0}, i * 2 + 1);
    addCylinder(0xffff00, {x: 0, y: 0, z: Math.PI/2}, position, i, {x: 0, y: 10, z: 0}, i * 2);
    addCylinder(0xffff00, {x: 0, y: 0, z: Math.PI/2}, position, i, {x: 0, y: 10, z: 0}, i * 2 + 1);
    scene.add(objectGroups[i * 2]);
    scene.add(objectGroups[i * 2 + 1]);

}
function addCylinder(color, rotation, position, i, translate, j) {
    const THREE = getTHREE();
    const geometry = new THREE.CylinderGeometry( 1, 1, 20, 32 );
    if(translate) {
        geometry.translate(translate.x, translate.y, translate.z);
    }
    const material = new THREE.MeshPhongMaterial({color: color} );
    const cylinder = new THREE.Mesh( geometry, material );


    cylinder.position.x = position.x;
    cylinder.position.y = position.y;
    cylinder.position.z = position.z;

    cylinder.rotation.x = rotation.x;
    cylinder.rotation.y = rotation.y;
    cylinder.rotation.z = rotation.z;
//cylinder.name = "a";

    effectorArms.push(cylinder);
    objectGroups[j].add(cylinder);
    //scene.add( cylinder );
}
