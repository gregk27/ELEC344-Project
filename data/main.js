// import * as THREE from '/three.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

setInterval(async ()=>{
    let raw = await(await fetch("/raw")).json();
    document.getElementById("pitch").innerText = raw.pitch;
    document.getElementById("yaw").innerText = raw.yaw;
    document.getElementById("roll").innerText = raw.roll;

    cube.rotation.x = raw.pitch;
    cube.rotation.y = raw.yaw;
    cube.rotation.z = raw.roll;

    renderer.render( scene, camera );
}, 40);