<template>
  <div id="info">Drag to spin the cube</div>
</template>
<style scoped>
  #info {
    font-family: monospace;
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    z-index: 1;
  }
</style>
<script>
  /* eslint no-use-before-define: off */
  import * as THREE from 'three';
  import 'three/examples/js/renderers/Projector';
  import Stats from 'stats.js';

  var container,
    stats;

  var camera,
    scene,
    renderer;

  var cube,
    plane;

  var targetRotation = 0,
    targetRotationOnMouseDown = 0;

  var mouseX = 0,
    mouseXOnMouseDown = 0;

  var windowHalfX = window.innerWidth / 2;

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + ((mouseX - mouseXOnMouseDown) * 0.02);
  }

  function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
      event.preventDefault();

      mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
      targetRotationOnMouseDown = targetRotation;
    }
  }

  function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
      targetRotation = targetRotationOnMouseDown + ((mouseX - mouseXOnMouseDown) * 0.05);
    }
  }

  function onDocumentMouseDown(event) {
    event.preventDefault();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
  }

  function onDocumentMouseOut() {
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);
  }

  function onDocumentMouseUp() {
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);
  }

  function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    container.style.position = 'absolute';
    container.style.top = '0';

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 500;

    scene = new THREE.Scene();

    // Cube
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    for (let i = 0; i < geometry.faces.length; i += 2) {
      const hex = Math.random() * 0xffffff;
      geometry.faces[i].color.setHex(hex);
      geometry.faces[i + 1].color.setHex(hex);
    }

    const material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.FaceColors,
      overdraw: 0.5,
    });

    cube = new THREE.Mesh(geometry, material);
    cube.position.y = 150;
    scene.add(cube);

    // Plane
    const geometry1 = new THREE.PlaneBufferGeometry(200, 200);
    geometry1.rotateX(-Math.PI / 2);

    const material1 = new THREE.MeshBasicMaterial({
      color: 0xe0e0e0,
      overdraw: 0.5,
    });

    plane = new THREE.Mesh(geometry1, material1);
    scene.add(plane);

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);
  }

  function render() {
    plane.rotation.y = cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05;
    renderer.render(scene, camera);
  }

  function animate() {
    window.requestAnimationFrame(animate);

    stats.begin();
    render();
    stats.end();
  }

  export default {
    mounted() {
      init();
      animate();
    },
  };
</script>
