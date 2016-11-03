<template>
  <canvas id="c"></canvas>
  <div class="info">Click to add gravity point.</div>
</template>

<style scoped>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  .info {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 15px;
    color: #eee;
    font-size: 13px;
    background-color: rgba(0, 0, 0, .5);
  }
</style>
<script>
  /*
   * code from: http://codepen.io/akm2/pen/rHIsa
   */
  /* global window */
  /* eslint no-underscore-dangle: off */
  /* eslint no-continue: off */
  /* eslint no-param-reassign: off */
  /* eslint no-var: off */
  /* eslint one-var: off */
  /* eslint no-bitwise: ["error", { "int32Hint": true }] */

  import dat from 'dat.gui/build/dat.gui';

  export default {
    mounted() {
      /**
       * requestAnimationFrame
       */
      window.document.querySelector('body').style.backgroundColor = '#222';
      window.requestAnimationFrame = () => window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };

      /**
       * Vector
       */
      class Vector {
        constructor(x = 0, y = 0) {
          this.x = x;
          this.y = y;
          this.add = (a, b) => new Vector(a.x + b.x, a.y + b.y);
          this.sub = (a, b) => new Vector(a.x - b.x, a.y - b.y);
          this.scale = (v, s) => v.clone().scale(s);
          this.random = () => new Vector(
            (Math.random() * 2) - 1,
            (Math.random() * 2) - 1
          );
        }

        set(x = 0, y = 0) {
          if (typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
          } else {
            this.x = x;
            this.y = y;
          }
          return this;
        }
        add(v) {
          this.x += v.x;
          this.y += v.y;
          return this;
        }
        sub(v) {
          this.x -= v.x;
          this.y -= v.y;
          return this;
        }
        scale(s) {
          this.x *= s;
          this.y *= s;
          return this;
        }
        length() {
          return Math.sqrt((this.x * this.x) + (this.y * this.y));
        }
        lengthSq() {
          return (this.x * this.x) + (this.y * this.y);
        }
        normalize() {
          const m = this.length();
          if (m) {
            this.x /= m;
            this.y /= m;
          }
          return this;
        }
        angle() {
          return Math.atan2(this.y, this.x);
        }
        angleTo(v) {
          const dx = v.x - this.x;
          const dy = v.y - this.y;
          return Math.atan2(dy, dx);
        }
        distanceTo(v) {
          const dx = v.x - this.x;
          const dy = v.y - this.y;
          return Math.sqrt((dx * dx) + (dy * dy));
        }
        distanceToSq(v) {
          const dx = v.x - this.x;
          const dy = v.y - this.y;
          return (dx * dx) + (dy * dy);
        }
        lerp(v, t) {
          this.x += (v.x - this.x) * t;
          this.y += (v.y - this.y) * t;
          return this;
        }
        clone() {
          return new Vector(this.x, this.y);
        }
        toString() {
          return `(X${this.x}, y:${this.y})`;
        }
      }

      /**
       * GravityPoint
       */
      class GravityPoint extends Vector {
        constructor(x, y, radius, targets) {
          super(x, y);
          this.radius = radius;
          this.currentRadius = radius * 0.5;
          this.RADIUS_LIMIT = 65;
          this.interferenceToPoint = true;
          this._targets = {
            particles: targets.particles || [],
            gravities: targets.gravities || [],
          };
          this._speed = new Vector();
          this.gravity = 0.05;
          this.isMouseOver = false;
          this.dragging = false;
          this.destroyed = false;
          this._easeRadius = 0;
          this._dragDistance = null;
          this._collapsing = false;
        }
        hitTest(p) {
          return this.distanceTo(p) < this.radius;
        }
        startDrag(dragStartPoint) {
          this._dragDistance = Vector.sub(dragStartPoint, this);
          this.dragging = true;
        }
        drag(dragToPoint) {
          this.x = dragToPoint.x - this._dragDistance.x;
          this.y = dragToPoint.y - this._dragDistance.y;
        }
        endDrag() {
          this._dragDistance = null;
          this.dragging = false;
        }
        addSpeed(d) {
          this._speed = this._speed.add(d);
        }
        collapse() {
          this.currentRadius *= 1.75;
          this._collapsing = true;
        }
        render(ctx) {
          if (this.destroyed) return;
          for (const item of this._targets.particles) {
            item.addSpeed(Vector.sub(this, item).normalize().scale(this.gravity));
          }
          this._easeRadius = (this._easeRadius + ((this.radius - this.currentRadius) * 0.07)) * 0.95;
          this.currentRadius += this._easeRadius;
          if (this.currentRadius < 0) this.currentRadius = 0;
          if (this._collapsing) {
            this.radius *= 0.75;
            if (this.currentRadius < 1) this.destroyed = true;
            this._draw(ctx);
            return;
          }
          const area = this.radius * this.radius * Math.PI;
          let absorp;
          let garea;
          for (const item of this._targets.gravities) {
            if (item === this || item.destroyed) continue;
            if (
              (this.currentRadius >= item.radius || this.dragging) &&
              this.distanceTo(item) < (this.currentRadius + item.radius) * 0.85
            ) {
              item.destroyed = true;
              this.gravity += item.gravity;

              absorp = Vector.sub(item, this).scale((item.radius / this.radius) * 0.5);
              this.addSpeed(absorp);

              garea = item.radius * item.radius * Math.PI;
              this.currentRadius = Math.sqrt((area + (garea * 3)) / Math.PI);
              this.radius = Math.sqrt((area + garea) / Math.PI);
            }
            item.addSpeed(Vector.sub(this, item).normalize().scale(this.gravity));
          }
          if (GravityPoint.interferenceToPoint && !this.dragging) this.add(this._speed);
          this._speed = new Vector();
          if (this.currentRadius > GravityPoint.RADIUS_LIMIT) this.collapse();
          this._draw(ctx);
        }
        _draw(ctx) {
          ctx.save();

          let grd = ctx.createRadialGradient(
            this.x,
            this.y,
            this.radius,
            this.x,
            this.y,
            this.radius * 5
          );
          grd.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
          grd.addColorStop(1, 'rgba(0, 0, 0, 1)');
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 5, 0, Math.PI * 2, false);
          ctx.fillStyle = grd;
          ctx.fill();

          const r = (Math.random() * this.currentRadius * 0.7) + (this.currentRadius * 0.3);
          grd = ctx.createRadialGradient(this.x, this.y, r, this.x, this.y, this.currentRadius());
          grd.addColorStop(0, 'rgba(0, 0, 0, 1)');
          grd.addColorStop(1, Math.random() < 0.2 ? 'rgba(255, 196, 0, 0.15)' : 'rgba(103, 181, 191, 0.75)');
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);
          ctx.fillStyle = grd;
          ctx.fill();
          ctx.restore();
        }
      }

      // GravityPoint.prototype = (function(o) {
      //   var s = new Vector(0, 0), p;
      //   for (p in o) s[p] = o[p];
      //   return s;
      // })({
      // });


      /**
       * Particle
       */
      class Particle extends Vector {
        constructor(x, y, radius) {
          super(x, y);
          this.radius = radius;
          this._latest = new Vector();
          this._speed = new Vector();
        }
        addSpeed(d) {
          this._speed.add(d);
        }
        update() {
          if (this._speed.length() > 12) this._speed.normalize().scale(12);

          this._latest.set(this);
          this.add(this._speed);
        }
      }

      // Particle.prototype = (function(o) {
      //     var s = new Vector(0, 0), p;
      //     for (p in o) s[p] = o[p];
      //     return s;
      // })({
      // });

      (() => {
        // Configs
        var BACKGROUND_COLOR = 'rgba(11, 51, 56, 1)',
          PARTICLE_RADIUS = 1,
          G_POINT_RADIUS = 10;

        // Vars
        var canvas = {},
          context,
          bufferCvs,
          bufferCtx,
          screenWidth,
          screenHeight,
          mouse = new Vector(),
          gravities = [],
          particles = [],
          grad,
          gui,
          control;


        // Event Listeners
        function resize() {
          screenWidth = canvas.width = window.innerWidth;
          screenHeight = canvas.height = window.innerHeight;

          const cx = canvas.width * 0.5;
          const cy = canvas.height * 0.5;

          bufferCvs.width = screenWidth;
          bufferCvs.height = screenHeight;
          context = canvas.getContext('2d');
          bufferCtx = bufferCvs.getContext('2d');

          grad = context.createRadialGradient(cx, cy, 0, cx, cy, Math.sqrt((cx * cx) + (cy * cy)));
          grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
        }

        function mouseMove(e) {
          var i,
            g,
            hit = false;

          mouse.set(e.clientX, e.clientY);

          for (i = gravities.length - 1; i >= 0; i -= 1) {
            g = gravities[i];
            if ((!hit && g.hitTest(mouse)) || g.dragging) {
              g.isMouseOver = hit = true;
            } else {
              g.isMouseOver = false;
            }
          }

          canvas.style.cursor = hit ? 'pointer' : 'default';
        }

        function mouseDown(e) {
          for (let i = gravities.length - 1; i >= 0; i -= 1) {
            if (gravities[i].isMouseOver) {
              gravities[i].startDrag(mouse);
              return;
            }
          }
          gravities.push(new GravityPoint(e.clientX, e.clientY, G_POINT_RADIUS, {
            particles,
            gravities,
          }));
        }

        function mouseUp() {
          for (const item of gravities) {
            if (item.dragging) {
              item.endDrag();
              break;
            }
          }
        }

        function doubleClick() {
          for (let i = gravities.length - 1; i >= 0; i -= 1) {
            if (gravities[i].isMouseOver) {
              gravities[i].collapse();
              break;
            }
          }
        }
        // Functions
        function addParticle(num) {
          var i,
            p;
          for (i = 0; i < num; i += 1) {
            p = new Particle(
              Math.floor((Math.random() * screenWidth) - (PARTICLE_RADIUS * 2)) + 1 + PARTICLE_RADIUS,
              Math.floor(
                (Math.random() * screenHeight)
                - (PARTICLE_RADIUS * 2)
              ) + 1 + PARTICLE_RADIUS,
              PARTICLE_RADIUS
            );
            p.addSpeed(Vector.random());
            particles.push(p);
          }
        }

        function removeParticle(num) {
          if (particles.length < num) num = particles.length;
          for (let i = 0; i < num; i += 1) {
            particles.pop();
          }
        }

        // GUI Control
        control = {
          particleNum: 50,
        };

        // Init
        canvas = window.document.getElementById('c');
        bufferCvs = window.document.createElement('canvas');

        window.addEventListener('resize', resize, false);
        resize(null);

        addParticle(control.particleNum);

        canvas.addEventListener('mousemove', mouseMove, false);
        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mouseup', mouseUp, false);
        canvas.addEventListener('dblclick', doubleClick, false);

        // GUI
        gui = new dat.GUI();
        gui.add(control, 'particleNum', 0, 300).step(1).name('Particle Num').onChange(() => {
          var n = (control.particleNum | 0) - particles.length;
          if (n > 0) {
            addParticle(n);
          } else if (n < 0) {
            removeParticle(-n);
          }
        });
        gui.add(GravityPoint, 'interferenceToPoint').name('Interference Between Point');
        gui.close();

        // Start Update
        const loop = () => {
          var i,
            len,
            g,
            p;

          context.save();
          context.fillStyle = BACKGROUND_COLOR;
          context.fillRect(0, 0, screenWidth, screenHeight);
          context.fillStyle = grad;
          context.fillRect(0, 0, screenWidth, screenHeight);
          context.restore();

          for (i = 0, len = gravities.length; i < len; i += 1) {
            g = gravities[i];
            if (g.dragging) g.drag(mouse);
            g.render(context);
            if (g.destroyed) {
              gravities.splice(i, 1);
              len -= 1;
              i -= 1;
            }
          }

          bufferCtx.save();
          bufferCtx.globalCompositeOperation = 'destination-out';
          bufferCtx.globalAlpha = 0.35;
          bufferCtx.fillRect(0, 0, screenWidth, screenHeight);
          bufferCtx.restore();

          // パーティクルをバッファに描画
          // for (i = 0, len = particles.length; i < len; i++) {
          //     particles[i].render(bufferCtx);
          // }
          len = particles.length;
          bufferCtx.save();
          bufferCtx.fillStyle = bufferCtx.strokeStyle = '#fff';
          bufferCtx.lineCap = bufferCtx.lineJoin = 'round';
          bufferCtx.lineWidth = PARTICLE_RADIUS * 2;
          bufferCtx.beginPath();
          for (i = 0; i < len; i++) {
            p = particles[i];
            p.update();
            bufferCtx.moveTo(p.x, p.y);
            bufferCtx.lineTo(p._latest.x, p._latest.y);
          }
          bufferCtx.stroke();
          bufferCtx.beginPath();
          for (i = 0; i < len; i++) {
            p = particles[i];
            bufferCtx.moveTo(p.x, p.y);
            bufferCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
          }
          bufferCtx.fill();
          bufferCtx.restore();

          // バッファをキャンバスに描画
          context.drawImage(bufferCvs, 0, 0);

          window.requestAnimationFrame(loop);
        };
        loop();
      })();
    },
  };
</script>
