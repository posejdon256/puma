import { getTHREE, setCamera, setRenderer, setScene } from '../Animation/AnimationFrame';
import { addCylinder, addSmallCylinder, clearCylinderParameters } from '../Geometry/Cylinder';
import { generateEffector } from './GenerateEffector';
import { InitializePuma } from '../Geometry/DrawPuma';

export function generateArm(container, i) {

    clearCylinderParameters();
    const THREE = getTHREE();
    const WIDTH = 700;
    const HEIGHT = 913;
    const renderer = new THREE.WebGLRenderer();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 90, WIDTH / HEIGHT, 1, 1000 );

    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);
    scene.add(camera);
    renderer.setSize(WIDTH, HEIGHT);

    camera.position.z = 200;
    camera.lookAt(scene.position);
    container.appendChild(renderer.domElement);
    setRenderer(renderer);
    setScene(scene);
    setCamera(camera);
    
    addSmallCylinder(i, {x: 0, y: -15, z: 0}, {x: 0, y: 0, z: 0});
    addCylinder(i, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0});
    addSmallCylinder(i, {x: 0, y: 15, z: 0}, {x: Math.PI / 2, y: 0, z: 0});
    addSmallCylinder(i, {x: 0, y: 15, z: 0}, {x:Math.PI / 2, y: 0, z: 0});
    addCylinder(i, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0});
    addSmallCylinder(i, {x: 0, y: -15, z: 0}, {x: 0, y: Math.PI / 2, z: 0});
    addCylinder(i, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0});
    addCylinder(i, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0});

    InitializePuma(i);

    generateEffector(i);

    
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-0, 10, 60);
    spotLight.castShadow = true;
    spotLight.intensity = 1;
    scene.add(spotLight);
}