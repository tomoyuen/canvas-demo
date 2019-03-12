<template>
  <div>
    <div id="waves" ref="container"></div>
  </div>
</template>
<style scoped>
  #waves {
    width: 100%;
    height: 100%;
    background-color: #193c6d;
    filter: progid: DXImageTransform.Microsoft.gradient(gradientType=1, startColorstr='#003073', endColorstr='#029797');
    background-image: url(//img.alicdn.com/tps/TB1d.u8MXXXXXXuXFXXXXXXXXXX-1900-790.jpg);
    background-size: 100% 100%;
    background-image: linear-gradient(135deg, #003073, #029797);
    text-align: center;
    margin: 0px;
    overflow: hidden;
  }
</style>
<script>
  import makeSprite from '../utils/makeSprite';

  const SEPARATION = 100,
    AMOUNTX = 100,
    AMOUNTY = 70;


  var camera,
    scene,
    renderer;

  var particles,
    particle,
    count = 0;

  var mouseX = 85,
    mouseY = -342;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
      event.preventDefault();
      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;
    }
  }

  function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault();
      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;
    }
  }

  function init(container) {
    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    particles = [];

    const material = new THREE.SpriteMaterial({ map: makeSprite(), color: 0xe1e1e1 });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.6, 0.6);

    let i = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++] = sprite.clone();
        particle.position.x = (ix * SEPARATION) - ((AMOUNTX * SEPARATION) / 2);
        particle.position.z = (iy * SEPARATION) - ((AMOUNTY * SEPARATION) / 2);
        scene.add(particle);
      }
    }

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    let i = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++];
        particle.position.y = (Math.sin((ix + count) * 0.3) * 50)
          + (Math.sin((iy + count) * 0.5) * 50);
        particle.scale.x = particle.scale.y = ((Math.sin((ix + count) * 0.3) + 1) * 2)
          + ((Math.sin((iy + count) * 0.5) + 1) * 2);
      }
    }
    renderer.render(scene, camera);
    count += 0.1;
  }

  function animate() {
    window.requestAnimationFrame(animate);
    render();
  }

  export default {
    mounted() {
      init(this.$refs.container);
      animate();
    },
  };
</script>
