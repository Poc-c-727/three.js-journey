import * as THREE from "three";
import gsap from "gsap";

console.log(gsap);

const canvas = document.querySelector("canvas.webgl");

/*
 * Scene
 */
const scene = new THREE.Scene();

// canvas size
const size = {
	width: 800,
	height: 600,
};

/*
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);

scene.add(camera);
camera.position.set(1, 1, 5);
/*
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/*
 * Object
 */
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(boxGeometry, basicMaterial);
cube.position.set(1, 1, 1);
let movimento = true;
scene.add(cube);

/*
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(size.width, size.height);

const clock = new THREE.Clock();

gsap.to(cube.position, { duration: 1, delay: 1, x: 3 });
gsap.to(cube.position, { duration: 1, delay: 2, x: -3 });

/*
 * Animation tick
 */
function tick() {
	// Time

	// Update objects

	// if (movimento) {
	// 	cube.position.x += 0.02;
	// 	cube.position.y += 0.004;
	// 	movimento = cube.position.x > 3 ? false : true;
	// } else {
	// 	cube.position.x -= 0.015;
	// 	cube.position.y -= 0.004;
	// 	movimento = cube.position.x < -3 ? true : false;
	// }
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// console.log(`Cube position ${cube.position.x}, movimento: ${movimento}`);
	camera.lookAt(cube.position);
	// render
	renderer.render(scene, camera);

	requestAnimationFrame(tick);
}

tick();
