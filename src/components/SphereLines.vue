<style scoped>
  a {
    color: #0078ff;
  }
</style>
<script>
  /* eslint no-param-reassign: off */
  import * as THREE from 'three';
  import 'three/examples/js/renderers/Projector';
  import 'three/examples/js/renderers/CanvasRenderer';

  var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    mouseX = 0,
    windowHalfX = window.innerWidth / 2;

  var camera,
    scene,
    renderer;

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
  }

  function onDocumentTouchStart(event) {
    if (event.touches.length > 1) {
      event.perventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
    }
  }

  function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
    }
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += ((-mouseX + 200) - camera.position.y) * 0.05;
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

    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);

    // particles
    const PI2 = Math.PI * 2;
    const material = new THREE.SpriteCanvasMaterial({
      color: 0xffffff,
      program(context) {
        context.beginPath();
        context.arc(0, 0, 0.5, 0, PI2, true);
        context.fill();
      },
    });

    for (let i = 0; i < 1000; i++) {
      particle = new THREE.Sprite(material);
      particle.position.x = (Math.random() * 2) - 1;
      particle.position.y = (Math.random() * 2) - 1;
      particle.position.z = (Math.random() * 2) - 1;
      particle.position.normalize();
      particle.position.multiplyScalar((Math.random() * 10) + 450);
      particle.scale.multiplyScalar(2);
      scene.add(particle);
    }

    // lines
    for (let i = 0; i < 300; i++) {
      const geometry = new THREE.Geometry();
      const vertex = new THREE.Vector3(
        (Math.random() * 2) - 1,
        (Math.random() * 2) - 1,
        (Math.random() * 2) - 1);
      vertex.normalize();
      vertex.multiplyScalar(450);

      geometry.vertices.push(vertex);

      const vertex2 = vertex.clone();
      vertex2.multiplyScalar((Math.random() * 0.3) + 1);

      geometry.vertices.push(vertex2);

      const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: Math.random(),
      }));
      scene.add(line);
    }

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
