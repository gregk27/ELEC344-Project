// import * as THREE from '/three.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(2, 0.5, 4);

const material = new THREE.MeshBasicMaterial( { color: 0x666666 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var material2 = new THREE.LineBasicMaterial( { color: 0xffffff } );
var wireframe = new THREE.LineSegments( geometry, material2 );
scene.add( wireframe );

camera.position.z = 5;

setInterval(async ()=>{
    let raw = await(await fetch("/raw")).json();
    document.getElementById("pitch").innerText = raw.pitch;
    document.getElementById("yaw").innerText = raw.yaw;
    document.getElementById("roll").innerText = raw.roll;

    cube.rotation.x = raw.pitch;
    cube.rotation.y = raw.yaw;
    cube.rotation.z = raw.roll;

    wireframe.rotation.x = raw.pitch;
    wireframe.rotation.y = raw.yaw;
    wireframe.rotation.z = raw.roll;

    renderer.render( scene, camera );
}, 40);