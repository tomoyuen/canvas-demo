<template>
  <div id="info">
    <a href="http://threejs.org" target="_blank">three.js</a> - lines - random
  </div>
</template>
<style scoped>
  #info {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    color: #fff;
  }
</style>
<script>
  /* eslint no-param-reassign: off */
  import * as THREE from 'three';
  import 'three/examples/js/renderers/Projector';
  import 'three/examples/js/renderers/CanvasRenderer';

  var mouseX = 0,
    mouseY = 0,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2;
  var camera,
    scene,
    renderer;

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function onDocumentTouchStart(event) {
    if (event.touches.length > 1) {
      event.perventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfX;
    }
  }

  function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      event.perventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;
    }
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += ((mouseY + 200) - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  function animate() {
    window.requestAnimationFrame(animate);
    render();
  }

  function init() {
    var container,
      particle;

    container = document.createElement('div');
    document.getElementById('app').appendChild(container);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;

    scene = new THREE.Scene();

    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const PI2 = Math.PI * 2;
    const material = new THREE.SpriteCanvasMaterial({
      color: 0xffffff,
      program(context) {
        context.beginPath();
        context.arc(0, 0, 0.5, 0, PI2, true);
        context.fill();
      },
    });

    const geometry = new THREE.Geometry();
    for (let i = 0; i < 100; i++) {
      particle = new THREE.Sprite(material);
      particle.position.x = (Math.random() * 2) - 1;
      particle.position.y = (Math.random() * 2) - 1;
      particle.position.z = (Math.random() * 2) - 1;
      particle.position.normalize();
      particle.position.multiplyScalar((Math.random() * 10) + 450);
      particle.scale.x = particle.scale.y = 10;
      scene.add(particle);

      geometry.vertices.push(particle.position);
    }

    const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
    }));
    scene.add(line);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);
  }

  export default {
    mounted() {
      init();
      animate();
    },
  };
</script>
