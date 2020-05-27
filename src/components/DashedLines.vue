<template>
  <div>
    <div id="info">
      <a href="http://threejs.org" target="_blank">three.js</a> - dashed lines example
    </div>
  </div>
</template>
<style scoped>
  #info {
    position: absolute;
    top: 0px;
    z-index: 100;
    width: 100%;
    padding: 5px;
    color: #fff;
  }
</style>
<script>
  /* eslint no-param-reassign: off */
  import 'three/examples/js/renderers/Projector';
  import Stats from 'stats.js';
  import hilbert3D from 'geometries/hilbert3D';

  var renderer,
    scene,
    camera,
    stats;
  var objects = [];
  var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

  function cube(size) {
    const h = size * 0.5;
    const geometry = new THREE.Geometry();

    geometry.vertices.push(
      new THREE.Vector3(-h, -h, -h),
      new THREE.Vector3(-h, h, -h),

      new THREE.Vector3(-h, h, -h),
      new THREE.Vector3(h, h, -h),

      new THREE.Vector3(h, h, -h),
      new THREE.Vector3(h, -h, -h),

      new THREE.Vector3(h, -h, -h),
      new THREE.Vector3(-h, -h, -h),


      new THREE.Vector3(-h, -h, h),
      new THREE.Vector3(-h, h, h),

      new THREE.Vector3(-h, h, h),
      new THREE.Vector3(h, h, h),

      new THREE.Vector3(h, h, h),
      new THREE.Vector3(h, -h, h),

      new THREE.Vector3(h, -h, h),
      new THREE.Vector3(-h, -h, h),


      new THREE.Vector3(-h, -h, -h),
      new THREE.Vector3(-h, -h, h),

      new THREE.Vector3(-h, h, -h),
      new THREE.Vector3(-h, h, h),

      new THREE.Vector3(h, h, -h),
      new THREE.Vector3(h, h, h),

      new THREE.Vector3(h, -h, -h),
      new THREE.Vector3(h, -h, h));

    return geometry;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function render() {
    const time = Date.now() * 0.001;

    for (var item of objects) {
      item.rotation.x = 0.25 * time;
      item.rotation.y = 0.25 * time;
    }

    renderer.render(scene, camera);
  }

  function animate() {
    window.requestAnimationFrame(animate);

    render();
    stats.update();
  }

  function init(container) {
    camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 200);
    camera.position.z = 150;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111111, 150, 200);

    const subdivisions = 6;
    const recursion = 1;

    const points = hilbert3D(new THREE.Vector3(0, 0, 0), 25.0, recursion, 0, 1, 2, 3, 4, 5, 6, 7);
    const spline = new THREE.CatmullRomCurve3(points);
    const geometrySpline = new THREE.Geometry();

    for (let i = 0; i < points.length * subdivisions; i++) {
      const index = i / (points.length * subdivisions);
      const position = spline.getPoint(index);

      geometrySpline.vertices[i] = new THREE.Vector3(position.x, position.y, position.z);
    }

    const geometryCube = cube(50);

    const object = new THREE.Line(geometrySpline, new THREE.LineDashedMaterial({
      color: 0xffffff,
      dashSize: 1,
      gapSize: 0.5,
    }));
    object.computeLineDistances();
    objects.push(object);
    scene.add(object);

    const object2 = new THREE.LineSegments(geometryCube, new THREE.LineDashedMaterial({
      color: 0xffaa00,
      dashSize: 3,
      gapSize: 1,
      linewidth: 2,
    }));
    object2.computeLineDistances();
    objects.push(object2);
    scene.add(object2);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x111111);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    container.appendChild(renderer.domElement);

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
