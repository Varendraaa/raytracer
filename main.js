import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(66, 149, 113)");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

// Keep track of added objects
export const sceneObjects = [];

export function addObjectToScene(data) {
  let obj;

  if (data.type === 'cube') {
    const geo = new THREE.BoxGeometry(data.size, data.size, data.size);
    const mat = new THREE.MeshStandardMaterial({ color: data.color });
    obj = new THREE.Mesh(geo, mat);
  }

  else if (data.type === 'sphere') {
    const geo = new THREE.SphereGeometry(data.size / 2, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ color: data.color });
    obj = new THREE.Mesh(geo, mat);
  }

  else if (data.type === 'light') {
    obj = new THREE.PointLight(data.color, 1, 100);
  }

  if (!obj) {
    console.warn(`Unsupported object type: ${data.type}`);
    return;
  }

  if (obj.position) {
    obj.position.set(data.position.x, data.position.y, data.position.z);
  }

  scene.add(obj);
  sceneObjects.push(obj);
}


const defaultLight = new THREE.DirectionalLight(0xffffff, 1);
defaultLight.position.set(5, 5, 5);
scene.add(defaultLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();