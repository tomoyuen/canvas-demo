<template>
  <div>
    <div id="container"></div>
    <div id="info">three.js - birds demo</div>
  </div>
</template>
<style scoped>
  #info {
    position: absolute;
    top: 0px;
    left: 50%;
    padding: 5px;
    transform: translateX(-50%);
  }
</style>
<script>
  /* eslint import/imports-first: off */
  import Stats from 'stats.js';
  import Bird from '../objects/Bird';
  import 'three/examples/js/renderers/Projector';

  var screenWidth = window.innerWidth,
    screenHeight = window.innerHeight,
    screenWidthHalf = screenWidth / 2,
    screenHeightHalf = screenHeight / 2;

  var camera,
    scene,
    renderer,
    birds,
    bird;

  var boid,
    boids;

  var stats;

  class Boid {
    constructor() {
      var acceleration = new THREE.Vector3(),
        width = 500,
        height = 500,
        depth = 200,
        goal,
        neighborhoodRadius = 100,
        maxSpeed = 4,
        maxSteerForce = 0.1,
        avoidWalls = false,
        vector = new THREE.Vector3();

      this.position = new THREE.Vector3();
      this.velocity = new THREE.Vector3();
      this.setGoal = (target) => {
        goal = target;
      };
      this.setAvoidWalls = (value) => {
        avoidWalls = value;
      };
      this.setWorldSize = (w, h, d) => {
        width = w;
        height = h;
        depth = d;
      };
      this.run = function (temps) {
        if (avoidWalls) {
          vector.set(-width, this.position.y, this.position.z);
          vector = this.avoid(vector);
          vector.multiplyScalar(5);
          acceleration.add(vector);

          vector.set(width, this.position.y, this.position.z);
          vector = this.avoid(vector);
          vector.multiplyScalar(5);
          acceleration.add(vector);

          vector.set(this.position.x, -height, this.position.z);
          vector = this.avoid(vector);
          vector.multiplyScalar(5);
          acceleration.add(vector);

          vector.set(this.position.x, height, this.position.z);
          vector = this.avoid(vector);
          vector.multiplyScalar(5);
          acceleration.add(vector);

          vector.set(this.position.x, this.position.y, -depth);
          vector = this.avoid(vector);
          vector.multiplyScalar(5);
          acceleration.add(vector);

          vector.set(this.position.x, this.position.y, depth);
          vector = this.avoid(vector);
          vector.multiplyScalar(5);
          acceleration.add(vector);
        }
        if (Math.random() > 0.5) {
          this.flock(temps);
        }
        this.move();
      };
      this.flock = function (temps) {
        if (goal) {
          acceleration.add(this.reach(goal, 0.005));
        }
        acceleration.add(this.alignment(temps));
        acceleration.add(this.cohesion(temps));
        acceleration.add(this.separation(temps));
      };
      this.move = function () {
        var l = this.velocity.length();

        this.velocity.add(acceleration);
        if (l > maxSpeed) {
          this.velocity.divideScalar(l / maxSpeed);
        }
        this.position.add(this.velocity);
        acceleration.set(0, 0, 0);
      };
      this.checkBounds = function () {
        if (this.position.x > width) this.position.x = -width;
        if (this.position.x < -width) this.position.x = width;
        if (this.position.y > height) this.position.y = -height;
        if (this.position.y < -height) this.position.y = height;
        if (this.position.z > depth) this.position.z = -depth;
        if (this.position.z < -depth) this.position.z = depth;
      };
      this.avoid = function (target) {
        const steer = new THREE.Vector3();

        steer.copy(this.position);
        steer.sub(target);
        steer.multiplyScalar(1 / this.position.distanceToSquared(target));

        return steer;
      };
      this.repulse = function (target) {
        const distance = this.position.distanceTo(target);

        if (distance < 150) {
          const steer = new THREE.Vector3();

          steer.subVectors(this.position, target);
          steer.multiplyScalar(0.5 / distance);

          acceleration.add(steer);
        }
      };
      this.reach = function (target, amount) {
        const steer = new THREE.Vector3();

        steer.subVectors(target, this.position);
        steer.multiplyScalar(amount);

        return steer;
      };
      this.alignment = function (temps) {
        var velSum = new THREE.Vector3(),
          count = 0;

        for (const item of temps) {
          if (Math.random() > 0.6) continue;
          const distance = item.position.distanceTo(this.position);
          if (distance > 0 && distance <= neighborhoodRadius) {
            velSum.add(item.velocity);
            count++;
          }
        }

        if (count > 0) {
          velSum.divideScalar(count);
          const l = velSum.length();
          if (l > maxSteerForce) {
            velSum.divideScalar(1 / maxSteerForce);
          }
        }

        return velSum;
      };
      this.cohesion = function (temps) {
        var distance,
          posSum = new THREE.Vector3(),
          steer = new THREE.Vector3(),
          count = 0;

        for (const item of temps) {
          if (Math.random() > 0.6) continue;

          distance = item.position.distanceTo(this.position);

          if (distance > 0 && distance <= neighborhoodRadius) {
            posSum.add(item.position);
            count++;
          }
        }

        if (count > 0) {
          posSum.divideScalar(count);
        }
        steer.subVectors(posSum, this.position);
        const l = steer.length();
        if (l > maxSteerForce) {
          steer.divideScalar(l / maxSteerForce);
        }

        return steer;
      };
      this.separation = function (temps) {
        var distance,
          posSum = new THREE.Vector3(),
          repulse = new THREE.Vector3();

        for (const item of temps) {
          if (Math.random() > 0.6) continue;
          distance = item.position.distanceTo(this.position);
          if (distance > 0 && distance <= neighborhoodRadius) {
            repulse.subVectors(this.position, item.position);
            repulse.normalize();
            repulse.divideScalar(distance);
            posSum.add(repulse);
          }
        }

        return posSum;
      };
    }
  }

  function onDocumentMouseMove(event) {
    const vector = new THREE.Vector3(
      event.clientX - screenWidthHalf,
      -event.clientY + screenHeightHalf,
      0);

    for (const item of boids) {
      vector.z = item.position.z;
      item.repulse(vector);
    }
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function init() {
    camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 1, 10000);
    camera.position.z = 450;

    scene = new THREE.Scene();

    birds = [];
    boids = [];

    for (let i = 0; i < 200; i++) {
      boid = boids[i] = new Boid();
      boid.position.x = (Math.random() * 400) - 200;
      boid.position.y = (Math.random() * 400) - 200;
      boid.position.z = (Math.random() * 400) - 200;
      boid.velocity.x = (Math.random() * 2) - 1;
      boid.velocity.y = (Math.random() * 2) - 1;
      boid.velocity.z = (Math.random() * 2) - 1;
      boid.setAvoidWalls(true);
      boid.setWorldSize(500, 500, 400);

      bird = birds[i] = new THREE.Mesh(
        new Bird(),
        new THREE.MeshBasicMaterial({
          color: Math.random() * 0xffffff,
          side: THREE.DoubleSide,
        }));
      bird.phase = Math.floor(Math.random() * 62.83);
      scene.add(bird);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(screenWidth, screenHeight);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.getElementById('container').appendChild(renderer.domElement);

    stats = new Stats();
    document.getElementById('container').appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);
  }

  function render() {
    for (let i = 0; i < birds.length; i++) {
      boid = boids[i];
      boid.run(boids);

      bird = birds[i];
      bird.position.copy(boids[i].position);

      const color = bird.material.color;
      color.r = color.g = color.b = (500 - bird.position.z) / 1000;

      bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
      bird.rotation.z = Math.atan2(boid.velocity.y / boid.velocity.length());

      bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
      bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;
    }

    renderer.render(scene, camera);
  }

  function animate() {
    window.requestAnimationFrame(animate);
    stats.begin();
    render();
    stats.end();
  }

  export default {
    mounted() {
      init();
      animate();
    },
  };
</script>
