<script>
/* eslint no-console: off */
import * as THREE from 'three';
import particleAsset from '../assets/images/particle.png';

// 设置场景大小
var width = 500,
  height = 500;
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

  // 创建例子geometry
  const particleCount = 1800,
    particles = new THREE.Geometry();

  // 创建粒子基本材质
  const loader = new THREE.TextureLoader();
  const particleMap = loader.load(particleAsset);
  const pMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: particleMap,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });

  // 依次创建单个粒子
  for (let p = 0; p < particleCount; p++) {
    // 粒子范围在-250到250之间
    const pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vector3(pX, pY, pZ);

    // 为每个粒子创建一个水平运动速度
    particle.velocity = new THREE.Vector3(0, -Math.random(), 0);

    // 将粒子加入粒子geometry
    particles.vertices.push(particle);
  }

  // 创建粒子系统
  const particleSystem = new THREE.Points(particles, pMaterial);
  // 允许粒子系统对粒子排序，以达到我们想要的效果
  particleSystem.sortParticles = true;

  // 将粒子系统加入场景
  scene.add(particleSystem);

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
  // 帧循环
  function update() {
    // 增加一点旋转量
    particleSystem.rotation.y += 0.01;
    let pCount = particleCount;
    while (pCount--) {
      // 获取单个粒子
      const particle = particles.vertices[pCount];
      // 检查是否需要重置
      if (particle.y < -250) {
        particle.y = 250;
        particle.velocity.y = 0;
      }
      // 用随机数更新水平速度分量，并根据速度更新位置
      particle.velocity.y -= Math.random() * 0.1;
      particle.add(particle.velocity);
    }
    // 告诉粒子系统我们改变了粒子位置
    particleSystem.geometry.verticesNeedUpdate = true;
    // 绘制粒子系统
    renderer.render(scene, camera);
    // 设置下一次刷新帧时对update的调用
    window.requestAnimationFrame(update);
  }
  update();
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

