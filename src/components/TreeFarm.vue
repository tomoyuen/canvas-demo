<script>
  /* eslint no-param-reassign: off */
  /* esint no-shadow: off */
  import * as THREE from 'three';
  import 'three/examples/js/controls/OrbitControls';

  var scene,
    camera,
    renderer,
    orbit,
    light;

  const treeMaterial = new THREE.MeshPhongMaterial({
    color: 0x2c9e4b,
    shininess: 20,
    side: THREE.FrontSide,
    shading: THREE.SmoothShading,
  });

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function noiseMap(size = 512, intensity = 120) {
    var i = 0;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = size;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const n = pixels.length;

    while (i < n) {
      pixels[i++] = pixels[i++] = pixels[i++] = Math.sin(i * i * i + (i / n) * Math.PI) * intensity;
      pixels[i++] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    const sprite = new THREE.Texture(canvas);
    sprite.needsUpdate = true;

    return sprite;
  }

  function Cone(size = 10, translate) {
    this.geometry = new THREE.CylinderGeometry(size / 2, size, size, 6);
    if (translate) {
      this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, size, 0));
    }
    THREE.Mesh.call(this, this.geometry, treeMaterial);
  }

  Cone.prototype = Object.assign(THREE.Mesh.prototype, {
    constructor: Cone,
  });

  function Tree(size = 6 + Math.random()) {
    THREE.Object3D.call(this);

    let lastCone;
    let cone;

    for (let i = 0; i < size; i++) {
      cone = new Cone((size - i) + 1, i);
      cone.position.y = 0;
      if (lastCone) {
        const box = new THREE.Box3().setFromObject(lastCone);
        cone.position.y = (box.max.y + box.min.y) / 2;
      } else {
        cone.position.y += 2;
      }
      lastCone = cone;
      cone.castShadow = true;
      cone.receiveShadow = true;
      this.add(cone);
    }
  }

  Tree.prototype = Object.assign(THREE.Object3D.prototype, {
    constructor: Tree,
  });

  function makeSprite() {
    const PI2 = Math.PI * 2;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const spriteSize = 8;
    canvas.width = canvas.height = spriteSize * 2;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(spriteSize, spriteSize, spriteSize, 0, PI2, true);
    ctx.fill();

    const sprite = new THREE.Texture(canvas);
    sprite.needsUpdate = true;

    return sprite;
  }
  // snow flowers
  function pointsParticles() {
    const pointGeometry = new THREE.Geometry();

    for (let i = 0; i < 200; i++) {
      const vertex = new THREE.Vector3();
      vertex.x = Math.random() * 150 - 75;
      vertex.y = Math.random() * 200;
      vertex.z = Math.random() * 150 - 75;
      pointGeometry.vertices.push(vertex);
    }

    pointGeometry.verticesNeedUpdate = true;
    pointGeometry.normalsNeedUpdate = true;
    pointGeometry.computeFaceNormals();

    const pointMaterial = new THREE.PointsMaterial({
      map: makeSprite(),
      blending: THREE.AdditiveBlending,
      depthTest: true,
      transparent: true,
    });

    const particles = new THREE.Points(pointGeometry, pointMaterial);
    scene.add(particles);

    return function (count1) {
      particles.geometry.vertices.forEach((vertex, i) => {
        vertex.x += Math.sin(count1 + i) * 0.1;
        vertex.y -= 0.2;
        if (vertex.y < 0) vertex.y = 200;
      });

      particles.geometry.verticesNeedUpdate = true;
    };
  }

  function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf4f4f6, 20, 200);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 2000);
    camera.position.x = 60;
    camera.position.y = 40;
    camera.position.z = 70;
    camera.updateProjectionMatrix();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf4f4f6);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    window.addEventListener('resize', onWindowResize, false);
    document.getElementById('app').appendChild(renderer.domElement);

    orbit = new THREE.OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = true;
    orbit.enablePan = true;
    orbit.autoRotate = true;
    orbit.autoRotateSpeed = 0.3;
    orbit.minPolarAngle = 0;
    orbit.maxPolarAngle = Math.PI * 0.45;
    orbit.minDistance = 20;
    orbit.maxDistance = 170;

    const light2 = new THREE.PointLight(0xfce38a, 0.1, 0, Math.PI / 2);
    light2.position.set(0, 150, -100);

    scene.add(light2);

    light = new THREE.PointLight(0xfce3e3, 0.4, 0, Math.PI / 2);
    light.position.set(50, 180, 200);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.far = 400;
    light.shadow.bias = 0.9;
    light.shadow.radius = 40;

    scene.add(light);

    const hemiLight = new THREE.HemisphereLight(0xebf7fd, 0xebf7fd, 0.7);
    hemiLight.position.set(0, 100, 0);
    scene.add(hemiLight);

    const landscapeGroup = new THREE.Object3D();
    scene.add(landscapeGroup);

    const geometry = new THREE.PlaneGeometry(400, 400, 10, 10);

    const material = new THREE.MeshPhongMaterial({
      color: 0xdddddd,
      shininess: 1000,
      bumpMap: noiseMap(1024, 255),
      bumpScale: 0.025,
      emissive: 0xebf7fd,
      emissiveIntensity: 0.2,
      side: THREE.DoubleSide,
      shading: THREE.SmoothShading,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;

    landscapeGroup.add(plane);

    const trees = [];

    for (let i = 0; i < plane.geometry.vertices.length; i++) {
      plane.geometry.vertices[i].z = Math.sin(i * i) * 6;
      const tree = new Tree();
      tree.rotation.x = Math.PI / -2;
      tree.position.copy(plane.geometry.vertices[i]);
      tree.position.x += (Math.random() - 0.5) * 2;
      tree.position.y += 2 * (Math.random() - 0.5);
      trees.push(tree);
      landscapeGroup.add(tree);
    }

    landscapeGroup.rotation.x = Math.PI / 2;

    plane.geometry.verticesNeedUpdate = true;
    plane.geometry.normalsNeedUpdate = true;
    plane.geometry.computeFaceNormals();

    let count = 0;
    const updateParticles = pointsParticles();
    function render() {
      window.requestAnimationFrame(render);
      count += 0.02;
      orbit.update();
      if (updateParticles) {
        updateParticles(count);
      }
      renderer.render(scene, camera);
    }
    render();
  }

  export default {
    mounted() {
      init();
    },
  };
</script>
