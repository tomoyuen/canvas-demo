<template>
  <div>
    <div id="info">
      <a href="http://threejs.org" target="_blank">three.js</a> - iteractive particles
    </div>
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
  import 'three/examples/js/renderers/Projector';
  import Stats from 'stats.js';

  var stats;
  var camera,
    scene,
    renderer;
  var raycaster,
    mouse;
  var PI2 = Math.PI * 2;
  var INTERSECTED;
  var radius = 600,
    theta = 0;

  function programFill(context) {
    context.beginPath();
    context.arc(0, 0, 0.5, 0, PI2, true);
    context.fill();
  }

  function programStroke(context) {
    context.lineWidth = 0.025;
    context.beginPath();
    context.arc(0, 0, 0.5, 0, PI2, true);
    context.stroke();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = ((event.clientX / window.innerWidth) * 2) - 1;
    mouse.y = -((event.clientY / window.innerHeight) * 2) + 1;
  }

  function init(container) {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 300, 500);

    scene = new THREE.Scene();

    for (let i = 0; i < 100; i++) {
      const particle = new THREE.Sprite(new THREE.SpriteMaterial({
        color: (Math.random() * 0x808080) + 0x808080,
      }));

      particle.position.x = (Math.random() * 800) - 400;
      particle.position.y = (Math.random() * 800) - 400;
      particle.position.z = (Math.random() * 800) - 400;
      particle.scale.x = particle.scale.y = (Math.random() * 20) + 20;
      scene.add(particle);
    }

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('resize', onWindowResize, false);
  }

  function render() {
    theta += 0.1;

    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));

    camera.lookAt(scene.position);
    camera.updateMatrixWorld();

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      if (INTERSECTED !== intersects[0].object) {
        if (INTERSECTED) INTERSECTED.material.program = programStroke;

        INTERSECTED = intersects[0].object;
        INTERSECTED.material.program = programFill;
      }
    } else {
      if (INTERSECTED) INTERSECTED.material.program = programStroke;

      INTERSECTED = null;
    }

    renderer.render(scene, camera);
  }

  function animate() {
    window.requestAnimationFrame(animate);
    render();
    stats.update();
  }

  export default {
    mounted() {
      init(this.$el);
      animate();
    },
  };
</script>
