<template></template>

<script>
import * as THREE from 'three';
// 设置场景大小
var width = 400,
  height = 300;
// 设置一些相机参数
var viewAngle = 45,
  aspect = width / height,
  near = 0.1,
  far = 1000;

function init() {
  // 获取DOM结构中的元素
  var container = document.querySelector('#app');
  // 创建渲染器、相机和场景
  var renderer = new THREE.WebGLRenderer();
  var camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
  var scene = new THREE.Scene();

  // 设置球体参数
  const radius = 50,
    segments = 16,
    rings = 16;

  // 创建球体表面的材质
  const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });

  // material覆盖在getmetry上，生成mesh
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, rings),
    sphereMaterial
  );
  // 将mesh加入到场景中
  scene.add(sphere);

  // 创建一个点光源
  const pointLight = new THREE.PointLight(0xFFFFFF);
  // 设置点光源位置
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;
  // 将点光源加入场景
  scene.add(pointLight);

  // 将相机加入场景
  scene.add(camera);
  // 相机的初始位置为原点
  // 将相机拉回来一些
  camera.position.z = 300;

  // 启动渲染器
  renderer.setSize(width, height);
  // 将渲染器加到DOM结构中
  container.appendChild(renderer.domElement);

  // 画
  renderer.render(scene, camera);
}
export default {
  data() {
    return {
      msg: 'hello',
    };
  },
  beforeCreate() {
    console.log('before create');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('before mount');
  },
  mounted() {
    console.log('mounted');
    init();
  },
  beforeUpdate() {
    console.log('before update');
  },
  updated() {
    console.log('updated');
  },
};
</script>

