import { setRenderer, setScene, setCamera, _animate, getTHREE } from '../Animation/AnimationFrame';
import { addCylinder, addSmallCylinder, clearCylinderParameters } from '../Geometry/Cylinder';

export function generateArm(container, i) {

    clearCylinderParameters();
    const THREE = getTHREE();
    const WIDTH = 700;
    const HEIGHT = 913;
    const renderer = new THREE.WebGLRenderer();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );

    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);
    scene.add(camera);
    renderer.setSize(WIDTH, HEIGHT);

    camera.position.z = 100;
    container.appendChild(renderer.domElement);
    setRenderer(renderer);
    setScene(scene);
    setCamera(camera);
    
    addSmallCylinder(i);
    addCylinder(i, {x: 0, y: 13, z: 0});
    addSmallCylinder(i, {x: 0, y: 13, z: 0}, {x: 3.14 / 2, y: 0, z: 0});
    addCylinder(i, {x: 13, y: 0, z: 0}, {x: 3.14 / 2, y: 0, z: 3.14 / 2});
    addSmallCylinder(i, {x: 13, y: 0, z: 0}, {x: 3.14 / 2, y: 0, z: 3.14 / 2});
    addCylinder(i, {x: 13, y: 0, z: 0}, {x: 3.14 / 2, y: 0, z: 3.14 / 2});
    addSmallCylinder(i, {x: 13, y: 0, z: 0});
    addCylinder(i, {x: 0, y: -13, z: 0}, {x: 0, y: 0, z: 3.14/2});

    
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-0, 10, 60);
    spotLight.castShadow = true;
    spotLight.intensity = 1;
    scene.add(spotLight);
}