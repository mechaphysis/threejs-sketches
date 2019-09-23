/**
 * Required objects when working in 3D: scene, camera, renderer
 */

var scene = new THREE.Scene();

var camera = new THREE.Camera(
  45, //field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  1, // near clipping plane (nothing is visible beyond)
  1000 // far clipping plane (same)
);

var renderer = new THREE.WebGLRenderer();
// set size of output image:
renderer.setSize(window.innerWidth, window.innerHeight);

// append the renderer dom element to the empty div created in index.html:
document.getElementById("webgl").appendChild(renderer.domElement);
