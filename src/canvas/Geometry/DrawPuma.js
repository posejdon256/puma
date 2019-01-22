import { getL1, getL2, getL3 } from '../../datas/CollectAndShareDatas';
import { getScene, getTHREE } from '../Animation/AnimationFrame';
import { addCylinder, getCylinders, getSmallCylinders } from './Cylinder';

const parts = [[],[]];

let smalls = [[], []];
let norms = [[], []], removings = [];
let effectors = [];

export function pushEffector(effector) {
    effectors.push(effector);
}
export function InitializePuma(i) {
    const cylinders = getCylinders();
    const smallCylinders = getSmallCylinders();

    const scene = getScene(i);
    const THREE = getTHREE();
    removings.push(cylinders[1]);
    for(let j = 0; j < 4; j ++) {
        smalls[i].push(smallCylinders[j]);
        norms[i].push(cylinders[j]);
    }

    //alfa5
    const part5 = new THREE.Object3D();
    part5.add(effectors[i]);

    //alfa1
    const part1 = new THREE.Object3D();
    part1.add(norms[i][3]);
    part1.add(part5);

    //alfa2
    const part2 = new THREE.Object3D();
    part2.add(smalls[i][3]);
    part2.add(norms[i][2]);
    part2.add(part1);

    //alfa3
    const part3 = new THREE.Object3D();
    part3.add(smalls[i][2]);
    part3.add(removings[i]);
    part3.add(part2);

    //alfa4
    const part4 = new THREE.Object3D();
    part4.add(smalls[i][1]);
    part4.add(norms[i][0]);
    part4.add(smalls[i][0]);
    part4.add(part3);

    //part5.add(part4);

    scene.add(part4);

    parts[i].push(part1);
    parts[i].push(part2);
    parts[i].push(part3);
    parts[i].push(part4);
    parts[i].push(part5);
}
export function updateL1() {
    //norms[0]
    //smalls[1]
    parts[0][3].remove(norms[0][0]);
    parts[1][3].remove(norms[1][0]);

    smalls[0][0].position.y = -getL1() / 2;
    smalls[1][0].position.y = -getL1() / 2;

    smalls[0][1].position.y = getL1() / 2;
    smalls[1][1].position.y = getL1() / 2;

    const newCylinder1 = addCylinder(0, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, getL1());
    const newCylinder2 = addCylinder(1, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, getL1());

    norms[0] = [newCylinder1, norms[0][1], norms[0][2], norms[0][3]];
    norms[1] = [newCylinder2, norms[1][1], norms[1][2], norms[1][3]];

    parts[0][3].add(newCylinder1);
    parts[1][3].add(newCylinder2);
}
export function updateL2() {
    parts[0][1].remove(norms[0][2]);
    parts[1][1].remove(norms[1][2]);

    const newCylinder1 = addCylinder(0, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, getL2());
    const newCylinder2 = addCylinder(1, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, getL2());

    smalls[0][3].position.y = -getL2() / 2;
    smalls[1][3].position.y = -getL2() / 2;

    norms[0] = [norms[0][0], norms[0][1], newCylinder1, norms[0][3]];
    norms[1] = [norms[1][0], norms[1][1], newCylinder2, norms[1][3]];

    parts[0][1].add(newCylinder1);
    parts[1][1].add(newCylinder2);

}
export function updateL3() {
    parts[0][0].remove(norms[0][3]);
    parts[1][0].remove(norms[1][3]);

    const newCylinder1 = addCylinder(0, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, getL3());
    const newCylinder2 = addCylinder(1, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, getL3());

    norms[0] = [norms[0][0], norms[0][1], norms[0][2], newCylinder1];
    norms[1] = [norms[1][0], norms[1][1], norms[0][2], newCylinder2];

    parts[0][0].add(newCylinder1);
    parts[1][0].add(newCylinder2);


}
export function DrawPuma(i, a1, a2, a3, a4, a5, q) {
    const l1 = getL1();
    const l2 = getL2();
    const l3 = getL3();

    parts[i][2].remove(removings[i]);
    const newCylinder = addCylinder(i, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, q);
    if(i === 0) {
        removings = [newCylinder, removings[1]];
    } else {
        removings = [removings[0], newCylinder];
    }
    parts[i][2].add(removings[i]);

    smalls[i][2].position.y = q/2;
    //alfa1
    parts[i][3].rotation.y = a1;

    //alfa2
    parts[i][2].rotation.z = a2;
    parts[i][2].position.x = -Math.sin(a2) * q / 2;
    parts[i][2].position.y = l1 /2 + Math.cos(a2) * q / 2;

    //alfa3
    parts[i][1].rotation.z = a3;
    parts[i][1].position.y = q / 2 - Math.cos(a3) * l2 / 2;
    parts[i][1].position.x = Math.sin(a3) * l2 / 2;

    //alfa4
    parts[i][0].rotation.z = a4;
    parts[i][0].rotation.x = Math.PI/2;
    parts[i][0].position.y = -l2 / 2 ;//+ Math.sin(a4) * l3 / 2;
    parts[i][0].position.x = Math.sin(a4) * l3 / 2;
    parts[i][0].position.z = -Math.cos(a4) * l3 / 2;

    //alfa5
    parts[i][4].position.y = -l3 / 2;
    parts[i][4].rotation.y = a5;
    parts[i][4].rotation.z = Math.PI;
    
}