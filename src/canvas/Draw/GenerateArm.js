import { getTHREE, setCamera, setRenderer, setScene } from '../Animation/AnimationFrame';
import { addCylinder, addSmallCylinder, clearCylinderParameters, clearCylinders } from '../Geometry/Cylinder';
import { InitializePuma } from '../Geometry/DrawPuma';
import { generateEffector } from './GenerateEffector';

export function generateArm(container, i) {

    clearCylinderParameters();
    const THREE = getTHREE();
    const WIDTH = 700;
    const HEIGHT = 913;
    const renderer = new THREE.WebGLRenderer();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 1, 1000 );

    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);
    scene.add(camera);
    const color = new THREE.Color( 0x9674a0 );
    renderer.setSize(WIDTH, HEIGHT);

    camera.position.z = 200;
    scene.background = color;
    camera.lookAt(scene.position);
    container.appendChild(renderer.domElement);
    setRenderer(renderer);
    setScene(scene);
    setCamera(camera);
    
    addSmallCylinder(i, {x: 0, y: -30, z: 0}, {x: 0, y: 0, z: 0});
    addCylinder(i, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, 60);
    addSmallCylinder(i, {x: 0, y: 30, z: 0}, {x: Math.PI / 2, y: 0, z: 0});
    addCylinder(i, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, false, true);
    addSmallCylinder(i, {x: 0, y: 15, z: 0}, {x:Math.PI / 2, y: 0, z: 0});
    addCylinder(i, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0});
    addSmallCylinder(i, {x: 0, y: -15, z: 0}, {x: 0, y: Math.PI / 2, z: 0});
    addCylinder(i, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0});

    generateEffector(i);
    InitializePuma(i);

    clearCylinders();
    
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 10, 100);
    spotLight.castShadow = true;
    spotLight.intensity = 0.7;
    scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight(0xffffff);
    spotLight2.position.set(-10, 10, 100);
    spotLight2.castShadow = true;
    spotLight2.intensity = 0.7;
    scene.add(spotLight2);
}