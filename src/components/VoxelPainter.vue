<template>
  <div id="info">
    <a href="http://threejs.org" target="_blank">three.js</a> - interactive - voxel painter
  </div>
</template>
<style scoped>
  #info {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
  }
</style>
<script>
  /* eslint no-param-reassign: off */
  import * as THREE from 'three';
  import 'three/examples/js/renderers/Projector';
  import 'three/examples/js/renderers/CanvasRenderer';

  var container,
    camera,
    scene,
    renderer;
  var plane;
  var mouse,
    raycaster,
    isShiftDown = false;
  var cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ff80,
    overdraw: 0.5,
  });
  var size = 500,
    step = 50;
  var objects = [];

  function render() {
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  function onDocumentMouseDown(event) {
    event.preventDefault();

    mouse.x = ((event.clientX / renderer.domElement.clientWidth) * 2) - 1;
    mouse.y = -((event.clientY / renderer.domElement.clientHeight) * 2) + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      if (isShiftDown) {
        if (intersect.object !== plane) {
          scene.remove(intersect.object);
          objects.splice(objects.indexOf(intersect.object), 1);
        }
      } else {
        const voxel = new THREE.Mesh(cubeGeometry, cubeMaterial);
        voxel.position.copy(intersect.point).add(intersect.face.normal);
        voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        scene.add(voxel);
        objects.push(voxel);
      }
      render();
    }
  }
  function onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 16:
        isShiftDown = true;
        break;
      default:
        return;
    }
  }
  function onDocumentKeyUp(event) {
    switch (event.keyCode) {
      case 16:
        isShiftDown = false;
        break;
      default:
        return;
    }
  }
  // function save() {
  //   window.open(renderer.domElement.toDataURL('image/png'), 'mywindow');
  //   return false;
  // }

  function init() {
    container = document.createElement('div');
    document.getElementById('app').appendChild(container);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(500, 800, 1300);
    camera.lookAt(new THREE.Vector3());

    scene = new THREE.Scene();

    const geometry = new THREE.Geometry();
    for (let i = -size; i < size; i += step) {
      geometry.vertices.push(new THREE.Vector3(-size, 0, i));
      geometry.vertices.push(new THREE.Vector3(size, 0, i));
      geometry.vertices.push(new THREE.Vector3(i, 0, -size));
      geometry.vertices.push(new THREE.Vector3(i, 0, size));
    }
    const material = new THREE.LineBasicMaterial({
      color: 0x000000,
      opacity: 0.2,
    });
    const line = new THREE.LineSegments(geometry, material);
    scene.add(line);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    const geometry2 = new THREE.PlaneBufferGeometry(1000, 1000);
    geometry2.rotateX(-Math.PI / 2);

    plane = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ visible: false }));
    scene.add(plane);
    objects.push(plane);

    const ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);

    const directionLight = new THREE.DirectionalLight(0xffffff);
    directionLight.position.x = Math.random() - 0.5;
    directionLight.position.y = Math.random() - 0.5;
    directionLight.position.z = Math.random() - 0.5;
    directionLight.position.normalize();
    scene.add(directionLight);

    const directionLight1 = new THREE.DirectionalLight(0x808080);
    directionLight1.position.x = Math.random() - 0.5;
    directionLight1.position.y = Math.random() - 0.5;
    directionLight1.position.z = Math.random() - 0.5;
    directionLight1.position.normalize();
    scene.add(directionLight1);

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);

    document.addEventListener('resize', onWindowResize, false);
  }

  export default {
    mounted() {
      init();
      render();
    },
  };
</script>
