<template>
  <div></div>
</template>
<script>
  /* eslint no-param-reassign: off */
  /* eslint object-shorthand: off */
  import 'three/examples/js/renderers/Projector';
  import Stats from 'stats.js';
  import makeSprite from 'utils/makeSprite';

  import texture1 from 'textures/envmap.png';
  import texture2 from 'textures/land_ocean_ice_cloud_2048.jpg';

  var stats;

  var camera,
    scene,
    renderer,
    objects;

  var pointLight;

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // function loadImage(path) {
  //   const image = document.createElement('img');
  //   const texture = new THREE.Texture(image, THREE.UVMapping);

  //   image.onload = () => {
  //     texture.needsUpdate = true;
  //   };

  //   image.src = path;
  //   return texture;
  // }

  function render() {
    const timer = Date.now() * 0.0001;

    camera.position.x = Math.cos(timer) * 1000;
    camera.position.z = Math.sin(timer) * 1000;
    camera.lookAt(scene.position);

    for (var item of objects) {
      item.rotation.x += 0.01;
      item.rotation.y += 0.005;
    }

    pointLight.position.x = Math.sin(timer * 7) * 300;
    pointLight.position.y = Math.cos(timer * 5) * 400;
    pointLight.position.z = Math.cos(timer * 3) * 300;

    renderer.render(scene, camera);
  }

  function animate() {
    window.requestAnimationFrame(animate);

    render();
    stats.update();
  }

  function init(container) {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 200, 800);
    scene = new THREE.Scene();

    // Grid
    const size = 500,
      step = 100;

    const geometry = new THREE.Geometry();
    for (let i = -100; i <= size; i += step) {
      geometry.vertices.push(new THREE.Vector3(-size, -120, i));
      geometry.vertices.push(new THREE.Vector3(size, -120, i));

      geometry.vertices.push(new THREE.Vector3(i, -120, -size));
      geometry.vertices.push(new THREE.Vector3(i, -120, size));
    }

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 0.2,
    });
    const line = new THREE.LineSegments(geometry, material);
    scene.add(line);

    // Spheres
    const geometry2 = new THREE.SphereGeometry(100, 14, 7);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(texture2);
    const envMap = textureLoader.load(texture1);

    envMap.mapping = THREE.SphericalReflectionMapping;

    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        blending: THREE.AdditiveBlending,
      }),
      new THREE.MeshLambertMaterial({
        color: 0xffffff,
      }),
      new THREE.MeshLambertMaterial({
        color: 0xffffff,
      }),
      new THREE.MeshNormalMaterial(),
      new THREE.MeshBasicMaterial({ map: earthTexture }),
      new THREE.MeshBasicMaterial({
        envMap: envMap,
      }),
    ];

    for (var item of geometry2.faces) {
      if (Math.random() > 0.5) item.materialIndex = Math.floor(Math.random() * materials.length);
    }
    materials.push(materials);

    objects = [];

    for (let i = 0; i < materials.length; i++) {
      const sphere = new THREE.Mesh(geometry2, materials[i]);

      sphere.position.x = ((i % 5) * 200) - 400;
      sphere.position.z = (Math.floor(i / 5) * 200) - 200;

      sphere.rotation.x = (Math.random() * 200) - 100;
      sphere.rotation.y = (Math.random() * 200) - 100;
      sphere.rotation.z = (Math.random() * 200) - 100;

      objects.push(sphere);
      scene.add(sphere);
    }

    // Lights
    scene.add(new THREE.AmbientLight(Math.random() * 0x202020));

    const directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    scene.add(directionalLight);

    pointLight = new THREE.PointLight(0xffffff, 1);
    scene.add(pointLight);

    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      color: 0xffffff,
      map: makeSprite(),
    }));
    sprite.scale.set(8, 8, 8);
    pointLight.add(sprite);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const debugCanvas = document.createElement('canvas');
    debugCanvas.width = 512;
    debugCanvas.height = 512;
    debugCanvas.style.position = 'absolute';
    debugCanvas.style.top = '0';
    debugCanvas.style.left = '0';

    container.appendChild(debugCanvas);

    const debugContext = debugCanvas.getContext('2d');
    debugContext.setTransform(1, 0, 0, 1, 256, 256);
    debugContext.strokeStyle = '#000000';

    stats = new Stats();
    container.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);
  }

  export default {
    mounted() {
      init(this.$el);
      animate();
    },
  };
</script>
