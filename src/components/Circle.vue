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
  camera.position.set(0, 0, 20);

  const geometry = new THREE.CircleGeometry(5, 26);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  renderer.setSize(width, height);
  // renderer.render(scene, camera);
  container.appendChild(renderer.domElement);

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
