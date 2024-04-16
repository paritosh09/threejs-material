import './style.css'
import * as THREE from 'three'
let scene, camera, renderer, sphere, ambientLight, light, spotlight;// floor, wall
const width = window.innerWidth;
const height = window.innerHeight;
const aspectRatio = width / height;


function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
	camera.position.z = 50;
	//   camera.lookAt(scene.position);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor("#1e272e", 1.0);
	renderer.setSize(width, height);

	const geometry = new THREE.SphereGeometry(10, 50, 50);
	//   const material = new THREE.MeshLambertMaterial({

	// 		wireframe:true, 
	//     color: 'blue',
	// 	// flatShading:true

	//   });

	// A material for shiny surfaces with specular highlights.
	// The material uses a non-physically based Blinn-Phong model for calculating reflectance
	const material = new THREE.MeshPhongMaterial({
		shininess: 100,
		// map: new THREE.TextureLoader().load( 'textures/Water2.jpg'),
		bumpMap: new THREE.TextureLoader().load('textures/water.jpg'),
		//An image texture to create a bump map. Values alter the perceived depth in relation to the lights.

		//The Bump map doesn't actually affect the geometry of the object, only the lighting.

        bumpScale:0.47,
		wireframe: false,
		specular: 0x636e72,
		flatShading: false,
		color: 'blue',
		reflectivity: 1,
		refractionRatio: 0.98
		// 	//To adjust the intensity of the specular surface highlight, on MeshPhongMaterial, use the specular and shininess properties.

		// 	//Also on on the MeshPhongMaterial, to adjust the environment map intensity, use the materials reflectivity property.

		// reflectivity = 1,
		// refractionRatio = 0.98
	});
	//The SpecularMap is a texture image that affects the specular surface highlight on MeshLambertMaterial and MeshPhongMaterial materials.
	//To adjust the intensity of the specular surface highlight, on MeshPhongMaterial, use the specular and shininess properties.
	sphere = new THREE.Mesh(geometry, material);
	sphere.name = "Sphere";
	sphere.castShadow = true;
	scene.add(sphere);

	// Lights
	light = new THREE.DirectionalLight('white', 2);
	light.position.set(100, 100, 20).normalize();
	scene.add(light)
	ambientLight = new THREE.AmbientLight(0xdfe6e9, .2);
	ambientLight.castShadow = true;
	scene.add(ambientLight);

	spotlight = new THREE.SpotLight(0x0dfe6e9, .3);
	spotlight.castShadow = true;
	spotlight.position.set(100, 100, 20);
	scene.add(spotlight);

	const NewSpotlight = new THREE.SpotLight(0x0dfe6e9, .2);
	NewSpotlight.castShadow = true;
	NewSpotlight.position.set(-50, -100, 50);
	scene.add(NewSpotlight);

	//   // Floor
	//   const floorGeometry = new THREE.PlaneGeometry(200, 200, 25, 25);
	//   const floorMesh = new THREE.MeshStandardMaterial({ color: 0x2d3440 });
	//   floor = new THREE.Mesh(floorGeometry, floorMesh);
	//   floor.rotation.x = Math.PI / 180 * - 90;
	//   floor.position.y = -15;
	//   floor.receiveShadow = true;
	//   scene.add(floor);

	//   // Wall
	//   const wallGeometry = new THREE.PlaneGeometry(200, 200, 25, 25);
	//   const wallMesh = new THREE.MeshStandardMaterial({ color: 0x2d3436 });
	//   wall = new THREE.Mesh(wallGeometry, wallMesh);
	//   wall.position.z = -20;
	//   wall.position.y = 0;
	//   wall.receiveShadow = true;
	//   scene.add(wall);

	// Rendering
	document.body.appendChild(renderer.domElement);
	window.onresize = function () {
		renderer.setSize(window.innerWidth, window.innerHeight);
		let aspectRatio = window.innerWidth / window.innerHeight;
		camera.aspect = aspectRatio;
		camera.updateProjectionMatrix();
	} 
	const render = function () {
		renderer.render(scene, camera);
		sphere.rotation.x += 0.01;
		sphere.rotation.y += 0.005;
		requestAnimationFrame(render);
	}
	render();
}

window.onload = init();