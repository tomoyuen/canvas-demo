<template>
  <div id="info">
    <a href="http://threejs.org" target="_blank">three.js</a> - clickable objects
  </div>
</template>
<style scoped>
  #info {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
  }
</style>
<script>
  /* eslint no-param-reassign: off */
  import * as THREE from 'three';
  import 'three/examples/js/renderers/Projector';
  import 'three/examples/js/renderers/CanvasRenderer';

  import Stats from 'three/examples/js/libs/stats.min';

  var container,
    stats;

  var camera,
    scene,
    renderer;

  var particleMaterial;

  var raycaster,
    mouse;

  var objects = [];

  var radius = 600,
    theta = 0;

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = ((event.clientX / renderer.domElement.clientWidth) * 2) - 1;
    mouse.y = ((event.clientY / renderer.domElement.clientHeight) * 2) + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      intersects[0].object.material.color.setHex(Math.random() * 0xffffff);

      const particle = new THREE.Sprite(particleMaterial);
      particle.position.copy(intersects[0].point);
      particle.scale.x = particle.scale.y = 16;
      scene.add(particle);
    }
  }

  function onDocumentTouchStart(event) {
    event.preventDefault();

    event.clientX = event.touches[0].clientX;
    event.clientY = event.touches[0].clientY;
    onDocumentMouseDown(event);
  }

  function init() {
    container = document.createElement('div');
    document.getElementById('app').appendChild(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 300, 500);

    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(100, 100, 100);

    for (let i = 0; i < 10; i++) {
      const object = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        opacity: 0.5,
      }));

      object.position.x = (Math.random() * 800) - 400;
      object.position.y = (Math.random() * 800) - 400;
      object.position.z = (Math.random() * 800) - 400;

      object.scale.x = (Math.random() * 2) + 1;
      object.scale.y = (Math.random() * 2) + 1;
      object.scale.z = (Math.random() * 2) + 1;

      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;

      scene.add(object);
      objects.push(object);
    }

    const PI2 = Math.PI * 2;
    particleMaterial = new THREE.SpriteCanvasMaterial({
      color: 0x000000,
      program(context) {
        context.beginPath();
        context.arc(0, 0, 0.5, 0, PI2, true);
        context.fill();
      },
    });

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);

    window.addEventListener('resize', onWindowResize, false);
  }

  function render() {
    theta += 0.1;

    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function animate() {
    window.requestAnimationFrame(animate);
    render();
    stats.update();
  }

  export default {
    mounted() {
      init();
      animate();
    },
  };
</script>
