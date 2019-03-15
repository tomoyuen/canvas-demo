<template>
  <div></div>
</template>

<script>
  import 'three/examples/js/controls/OrbitControls';
  import 'three/examples/js/ParametricGeometries';

  function init(container) {
    const renderer = new THREE.WebGLRenderer();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
    const scene = new THREE.Scene();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    const orbit = new THREE.OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = false;

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    lights.forEach(item => item.name = 'light');

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    const object = new THREE.Object3D();

    const line = new THREE.LineSegments(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
      })
    );

    line.name = 'line';

    object.add(line);

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
      })
    );

    mesh.name = 'mesh';
    mesh.FlatShading = true;

    container.appendChild(renderer.domElement);

    object.add(mesh);

    scene.add(camera);
    camera.position.z = 3;
    window.THREE = THREE;
    window.scene = scene;

    scene.add(object);

    function render() {
      window.requestAnimationFrame(render);
      object.rotation.x += 0.005;
      object.rotation.y += 0.005;

      renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    render();
  }

  export default {
    mounted() {
      init(this.$el);
    },
  };
</script>
