import { getCylinders, getSmallCylinders, addCylinder, addSmallCylinder } from "./Cylinder";
import { getScene, getTHREE } from "../Animation/AnimationFrame";
import { getL1, getL2, getL3 } from "../../datas/CollectAndShareDatas";
import { limeA100 } from "material-ui/styles/colors";

const parts = [[],[]];
let removing;

export function InitializePuma(i) {
    const cylinders = getCylinders();
    const smallCylinders = getSmallCylinders();

    const scene = getScene(i);
    const THREE = getTHREE();
    removing = cylinders[i * 4 + 3];

    //alfa1
    const part1 = new THREE.Object3D();
    //part1.add(smallCylinders[ i * 4 + 3]);
    part1.add(cylinders[i * 4 + 2]);
   // part1.add(smallCylinders[i * 4 + 2]);

    //alfa2
    const part2 = new THREE.Object3D();
    part2.add(smallCylinders[i * 4 + 3]);
    part2.add(cylinders[i * 4 + 1]);
    part2.add(part1);

    //alfa3
    const part3 = new THREE.Object3D();
    part3.add(smallCylinders[i * 4 + 2]);
    part3.add(removing);
    part3.add(part2);

    //alfa4
    const part4 = new THREE.Object3D();
    part4.add(smallCylinders[ i * 4 + 0]);
    part4.add(cylinders[4 * i + 0]);
    part4.add(smallCylinders[i * 4 + 1]);
    part4.add(part3);

    scene.add(part4);

    parts[i].push(part1);
    parts[i].push(part2);
    parts[i].push(part3);
    parts[i].push(part4);
}
export function DrawPuma(i, a1, a2, a3, a4, a5, q) {
    const l1 = getL1();
    const l2 = getL2();
    const l3 = getL3();

    const smallCylinders = getSmallCylinders();
    parts[i][2].remove(removing);
    const newCylinder = addCylinder(i, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, q);
    removing = newCylinder;
    parts[i][2].add(removing);
    //smallCylinders[i * 4 + 1].y = 15;
   // parts[i][3].add(addSmallCylinder(i, {x: 0, y: -q/2, z: 0}, {x: Math.PI / 2, y: 0, z: 0}));

   smallCylinders[i * 4 + 2].position.y = q/2;
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
}