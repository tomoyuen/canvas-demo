<template>
  <div></div>
</template>
<script>
  import * as THREE from 'three';
  import particleSource from '../assets/images/particle.png';

  var particleCount = 1800,
    particles = new THREE.Geometry();

  var scene,
    renderer,
    camera,
    particleSystem;

  function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0, 0, 0));
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById('app').appendChild(renderer.domElement);
    camera = new THREE.Camera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 300;
    scene = new THREE.Scene();

    const loader = new THREE.CubeTextureLoader();
    const paricleMap = loader.load(particleSource);

    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 20,
      map: paricleMap,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Vector3(
          Math.random() * 500 - 250,
          Math.random() * 500 - 250,
          Math.random() * 500 - 250);

      particle.velocity = new THREE.Vector3(0, -Math.random(), 0);

      particles.vertices.push(particle);
    }

    particleSystem = new THREE.Points(particles, pMaterial);
    particleSystem.sortParticles = true;

    scene.add(particleSystem);
  }

  function animate() {
    var temp = particleCount;
    particleSystem.rotation.y += 0.01;

    while (temp--) {
      const particle = particles.vertices[temp];
      if (particle.y < -200) {
        particle.y = 200;
        particle.velocity.y = 0;
      }

      particle.velocity.y -= Math.random() * 0.1;
      particle.add(particle.velocity);
    }
    particleSystem.geometry__dirtyVertices = true;
    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
  }

  export default {
    mounted() {
      init();
      animate();
    },
  };
</script>
