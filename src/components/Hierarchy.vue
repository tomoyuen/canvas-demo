<template>

</template>
<style scoped>

</style>
<script>
  import * as THREE from 'three';
  import 'three/examples/js/renderers/Projector';
  import 'three/examples/js/renderers/CanvasRenderer';

  import Stats from 'three/examples/js/libs/stats.min';

  var container,
    stats;

  var camera,
    scene,
    renderer;

  var geometry,
    group;

  var mouseX = 0,
    mouseY = 0,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2;

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 10;
    mouseY = (event.clientY - windowHalfY) * 10;
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    const currentSeconds = Date.now();
    group.rotation.x = Math.sin(currentSeconds * 0.0007) * 0.5;
    group.rotation.y = Math.sin(currentSeconds * 0.0003) * 0.5;
    group.rotation.z = Math.sin(currentSeconds * 0.0002) * 0.5;

    renderer.render(scene, camera);
  }

  function animate() {
    window.requestAnimationFrame(animate);

    render();
    stats.update();
  }

  function init() {
    container = document.createElement('div');
    document.getElementById('app').appendChild(container);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshNormalMaterial({ overdraw: 0.5 });

    group = new THREE.Group();

    for (let i = 0; i < 200; i++) {
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = (Math.random() * 2000) - 1000;
      mesh.position.y = (Math.random() * 2000) - 1000;
      mesh.position.z = (Math.random() * 2000) - 1000;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      group.add(mesh);
    }

    scene.add(group);

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
  }

  export default {
    mounted() {
      init();
      animate();
    },
  };
</script>
