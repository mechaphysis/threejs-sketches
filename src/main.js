/**
 * Required objects when working in 3D: scene, camera, renderer
 */

function init() {
  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(
    45, //field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    1, // near clipping plane (nothing is visible beyond)
    1000 // far clipping plane (same)
  );

  // Create sphere
  var sphere = getSphere(1, 0xff0000);
  sphere.position.y = sphere.geometry.parameters.radius;
  // add object to the scene for it to be visible:
  scene.add(sphere);

  //set name attribute for sphere (for animation purposes):
  sphere.name = "animatedSphere";

  var plane = getPlane(50, 50, 0x00ff00);
  scene.add(plane);
  plane.rotation.x = Math.PI / 2;

  /**
   * at this point we still don't see anything in the screen.
   * This is because three.js by default places new added objects into
   * the XYZ coords of (0,0,0) which are the same by default to both
   * geometry objects (our sphere) but also for the camera.
   * We have to move either of them in order for the sphere to be visible
   *  */
  camera.position.x = 0;
  camera.position.y = 6;
  camera.position.z = 6;
  /**
   * Pass a vector of coordinates for the camera to look at.
   * we gonna pass the coordinates of the sphere (0,0,0)
   */
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  //Add spotlight:
  var spotlight_01 = getSpotlight(0xffffff, 1);
  scene.add(spotlight_01);
  var spotlight_02 = getSpotlight(0xffffff, 1);
  scene.add(spotlight_02);

  spotlight_01.position.x = 6;
  spotlight_01.position.y = 8;
  spotlight_01.position.z = -20;

  spotlight_02.position.x = -12;
  spotlight_02.position.y = 6;
  spotlight_02.position.z = -10;

  var renderer = new THREE.WebGLRenderer();
  // enabling shadow
  renderer.shadowMap.enabled = true;

  // set size of output image:
  renderer.setSize(window.innerWidth, window.innerHeight);

  // append the renderer dom element to the empty div created in index.html:
  document.getElementById("webgl").appendChild(renderer.domElement);

  renderer.render(scene, camera); // static
  //update(renderer, scene, camera); // animated
}

/**
 *
 * @param {*} radius
 * @param {*} hexColor provide hex value
 */
function getSphere(radius, hexColor) {
  var geometry = new THREE.SphereGeometry(radius, 24, 24);
  var material = new THREE.MeshStandardMaterial({
    color: hexColor
  });

  var sphere = new THREE.Mesh(geometry, material);
  // tell sphere to cast shadows:
  sphere.castShadow = true;
  return sphere;
}

function getPlane(width, height, hexColor) {
  var geometry = new THREE.PlaneGeometry(width, height);
  var material = new THREE.MeshStandardMaterial({
    color: hexColor,
    side: THREE.DoubleSide
  });

  var plane = new THREE.Mesh(geometry, material);
  // tell the plane to receive shadows
  plane.receiveShadow = true;

  // increase roughtness of the material:
  plane.material.roughness = 0.65;
  plane.material.metalness = 0.75;
  return plane;
}

// For Mesh materials other than Basic whe need to define a light source
function getSpotlight(color, intensity) {
  var light = new THREE.SpotLight(color, intensity);

  //tell light to cast shadows:

  light.castShadow = true;

  //increase shadow resolutions:

  light.shadow.mapSize.x = 4096;
  light.shadow.mapSize.y = 4096;
  return light;
}
// recursive update function:
function update(renderer, scene, camera) {
  renderer.render(scene, camera);

  var sphere = scene.getObjectByName("animatedSphere");

  sphere.scale.x += 0.01;
  sphere.scale.y += 0.01;
  requestAnimationFrame(function() {
    update(renderer, scene, camera);
  });
}
init();
