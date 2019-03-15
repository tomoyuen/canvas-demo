<template>
  <div>
    <div id="info">
      <a href="http://threejs.org" target="_blank">three.js</a> - lines - random
    </div>
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
  import 'three/examples/js/renderers/Projector';
  import Stats from 'stats.js';
  import hilbert3D from 'geometries/hilbert3D';

  var mouseX = 0,
    mouseY = 0,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,
    camera,
    scene,
    renderer,
    material;

  var stats;

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
      mouseY = event.touches[0].pageY - windowHalfY;
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
    camera.position.y += ((-mouseY + 200) - camera.position.y) * 0.05;

    camera.lookAt(scene.position);

    const time = Date.now() * 0.0005;

    scene.children.forEach((item, i) => {
      if (item instanceof THREE.Line) item.rotation.y = time * (i % 2 ? 1 : -1);
    });

    renderer.render(scene, camera);
  }

  function animate() {
    window.requestAnimationFrame(animate);
    render();

    stats.update();
  }

  function init(container) {
    camera = new THREE.PerspectiveCamera(33, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 700;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry3 = new THREE.Geometry();
    const points = hilbert3D(new THREE.Vector3(0, 0, 0), 200.0, 2, 0, 1, 2, 3, 4, 5, 6, 7);
    const color3 = [];

    for (let i = 0; i < points.length; i++) {
      geometry3.vertices.push(points[i]);
      color3[i] = new THREE.Color(0xffffff);
      color3[i].setHSL(i / points.length, 1.0, 0.5);
    }
    geometry3.colors = color3;

    material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 1,
      linewidth: 3,
      vertexColors: 2,
    });

    const line = new THREE.Line(geometry3, material);
    line.scale.x = line.scale.y = line.scale.z = 0.3 * 1.5;
    line.position.x = 0;
    line.position.y = 0;
    line.position.z = 0;
    scene.add(line);

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    document.addEventListener('resize', onWindowResize, false);
  }


  export default {
    mounted() {
      init(this.$el);
      animate();
    },
  };
</script>
