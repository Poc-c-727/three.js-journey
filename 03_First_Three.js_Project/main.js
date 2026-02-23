import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
// 		* Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

//		* Material
const material = new THREE.MeshBasicMaterial({ color: "blue" });

// 		* Mesh ( Geometry + Material )
const mesh = new THREE.Mesh(geometry, material);

// Add object to the scene
scene.add(mesh);

const sizes = {
	width: 800,
	heigth: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigth, 1, 1000);
camera.position.z = 3;

// Add cameda to the scene
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.heigth);

renderer.render(scene, camera);
