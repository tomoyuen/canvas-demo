<template>
  <div></div>
</template>
<script>
  /* eslint global-require: off */
  var width = window.innerWidth,
    height = window.innerHeight;

  var time = 0,
    urls = [
      require('../assets/images/neg-x.png'),
      require('../assets/images/neg-y.png'),
      require('../assets/images/neg-z.png'),
      require('../assets/images/pos-x.png'),
      require('../assets/images/pos-y.png'),
      require('../assets/images/pos-z.png'),
    ];
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, width / height, 1, 1500);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const origin = new THREE.Vector3();

  function init(container) {
    const loader = new THREE.CubeTextureLoader();
    const cubemap = loader.load(urls);
    cubemap.format = THREE.RGBFormat;
    const shader = THREE.ShaderLib.cube;
    shader.uniforms.tCube.texture = cubemap;

    const material = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide,
    });

    const skybox = new THREE.Mesh(new THREE.CubeGeometry(1000, 1000, 1000), material);
    const ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    scene.add(pointLight);

    const reflectionMaterial = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      envMap: cubemap,
    });

    const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(60, 20, 100), reflectionMaterial);

    scene.add(torus);
    scene.add(camera);
    scene.add(skybox);

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
  }

  function animate() {
    time += 0.005;

    camera.position.x = Math.sin(time) * 400;
    camera.position.z = Math.cos(time) * 400;
    camera.lookAt(origin);

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }

  export default {
    mounted() {
      init(this.$el)
      animate();
    },
  };
</script>
