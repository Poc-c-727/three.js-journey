import * as THREE from "three";

const canva = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/*
 * Objects
 */

// group
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });

const cube1 = new THREE.Mesh(geometry, material);
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(geometry, material);
cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(geometry, material);
cube3.position.x = 1.5;
group.add(cube3);

// const mesh = new THREE.Mesh(geometry, material);

/*
 * Position
 */
// mesh.position.set(0.7, -0.6, 1);

/*
 * Scale
 */
// mesh.scale.set(2, 0.5, 0.5);

/*
 * Rotation
 */
// mesh.rotation.set(Math.PI / 4, Math.PI / 4, 0);

// scene.add(mesh);

/*
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// sizes
const sizes = {
	width: 800,
	heigth: 600,
};

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigth);
camera.position.set(0, 0, 3);
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canva });

renderer.setSize(sizes.width, sizes.heigth);

renderer.render(scene, camera);
