<template>
  <div></div>
</template>
<script>
function init(container) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

  renderer.setClearColor(0x000000);
  camera.position.set(0, 0, 10);

  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 2, 4);
  pointLight.name = 'light';

  scene.add(pointLight);

  const geometry = new THREE.ConeBufferGeometry(1, 4, 16);
  const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  window.THREE = THREE;
  window.scene = scene;

  function animate() {
    cube.rotation.x += .01;
    cube.rotation.y += .01;
    cube.rotation.z += .01;
    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
  }

  animate();
}

export default {
  mounted() {
    init(this.$el);
  }
}
</script>
