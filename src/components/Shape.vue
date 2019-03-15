<template>
  <div>
    <canvas id="mainCanvas" ref="canvas"></canvas>
  </div>
</template>
<style scoped>
  #mainCanvas {
    height: 100%;
  }
</style>
<script>
  function init(canvas) {
    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setClearColor(0x000000);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
    camera.position.set(0, 0, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // Plane
    const planeGeo = new THREE.PlaneGeometry(1.5, 1.5);
    const plane = new THREE.Mesh(planeGeo, material);

    plane.position.x = 1;
    scene.add(plane);

    // Triangle
    const triGeo = new THREE.Geometry();

    triGeo.vertices = [
      new THREE.Vector3(0, -0.8, 0),
      new THREE.Vector3(-2, -0.8, 0),
      new THREE.Vector3(-1, 0.8, 0),
    ];
    triGeo.faces.push(new THREE.Face3(0, 2, 1));

    const triangle = new THREE.Mesh(triGeo, material);
    scene.add(triangle);

    renderer.render(scene, camera);
  }
  export default {
    mounted() {
      init(this.$refs.canvas);
    },
  };
</script>
