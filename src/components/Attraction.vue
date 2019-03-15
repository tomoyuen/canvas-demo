<template>
  <div></div>
</template>
<script>
  /*
    * 来源：http://codepen.io/natewiley/pen/yakLgb
   */
  /* global window document */
  /* eslint no-console: off */
  /* eslint no-var: off */
  /* eslint class-methods-use-this: off */
  const { random, atan2, cos, sin, hypot } = Math;
  const max = 200;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const particles = [];

  let width,
    height,
    point,
    hue = 0;

  class Particle {
    constructor(context) {
      this.context = context;
      this.init();
    }
    draw() {
      this.context.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      this.context.stroke();
      this.update();
    }
    update() {
      if (this.changed) {
        this.alpha *= 0.92;
        this.size += 2;
        this.changedFrame += 1;
        if (this.changedFrame > this.maxChangedFrames) {
          this.reset();
        }
      } else if (this.distance(point.x, point.y) < 50) {
        this.changed = true;
      } else {
        const dx = point.x - this.x;
        const dy = point.y - this.y;
        const angle = atan2(dy, dx);

        this.alpha += 0.01;
        this.x += this.velocity * cos(angle);
        this.y += this.velocity * sin(angle);
        this.velocity += 0.02;
      }
    }
    init() {
      this.hue = hue;
      this.alpha = 0;
      this.size = this.random(1, 5);
      this.x = this.random(0, width);
      this.y = this.random(0, height);
      this.velocity = this.size * 0.5;
      this.changed = null;
      this.changedFrame = 0;
      this.maxChangedFrames = 50;
    }
    reset() {
      this.init();
    }
    distance(x, y) {
      return hypot(x - this.x, y - this.y);
    }
    random(min, max1) {
      return (random() * (max1 - min)) + min;
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(0,0,0, .2)';
    ctx.fillRect(0, 0, width, height);
    particles.forEach((p) => {
      p.draw();
    });
    hue += 0.3;
    window.requestAnimationFrame(animate);
  }

  function touches(e) {
    point.x = e.touches ? e.touches[0].clientX : e.clientX;
    point.y = e.touches ? e.touches[0].clientY : e.clientY;
  }

  function setup() {
    for (let i = 0; i < max; i += 1) {
      setTimeout(() => {
        const p = new Particle(ctx);
        particles.push(p);
      }, i * 10);
    }

    canvas.addEventListener('mousemove', touches, false);
    canvas.addEventListener('touchmove', touches, false);
    canvas.addEventListener('mouseleave', () => {
      point = { x: width / 2, y: height / 2 };
    }, false);
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      point = { x: width / 2, y: height / 2 };
    }, false);
    animate();
  }

  export default {
    mounted() {
      this.$el.style.backgroundColor = 'black';
      this.$el.style.overflow = 'hidden';
      this.$el.appendChild(canvas);

      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      point = { x: width / 2, y: height / 2 };
      setup();
    },
    destroyed() {
      this.$el.style.backgroundColor = 'none';
      this.$el.style.overflow = 'auto';
    }
  };
</script>
