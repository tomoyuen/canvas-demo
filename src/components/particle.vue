<template>
  <div>
    <form class="input-block">
      <input id="word" type="text" placeholder="输入发射文字···">
      <button type="sumbit" class="btn">发射</button>
    </form>
    <canvas id="canvas"></canvas>
  </div>
</template>
<style scoped>
  .input-block {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    widows: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  .btn {
    display: inline-block;
    padding: 0.35em 0.9em 0.35em;
    margin-left: 4px;
    outline: none;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    background: rgba(255,255,255,0.3);
    color: #fff;
    border-radius: 2px;
    border: none;
    font-size: 110%;
  }
  #word {
    display: block;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: rgba(255,255,255,0.5);
    background-image: none;
    border: none;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }
  #word:focus {
    background-color: rgba(255, 255, 255, .7);
  }
</style>
<script>
  /* global window */
  /* eslint no-console: off */
  /* eslint no-param-reassign: off */
  /* eslint no-var: off */
  /* eslint no-cond-assign: off */
  /* eslint no-mixed-operators: off */
  /* eslint no-continue: off */
  /* eslint no-unused-vars: off */
  // import imgUrl from '../assets/images/demo.jpg';

  export default {
    mounted() {
      var dotList = [];
      var finishCount = 0;
      var rafId = null;
      var fontSize = 500;
      var fontFamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';

      // const img = new window.Image();
      // img.src = imgUrl;

      const canvas = window.document.querySelector('#canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = window.document.body.clientWidth;
      canvas.height = window.document.body.clientHeight;

      class Dot {
        constructor(centerX, centerY, radius) {
          this.x = centerX;
          this.y = centerY;
          this.radius = radius;
          this.frameNum = 0;
          this.frameCount = Math.ceil(3000 / 16.66);
          this.sx = 1000;
          this.sy = 900;
          this.delay = this.frameCount * Math.random();
          this.delayCount = 0;
        }
      }

      function setFontSize(s) {
        ctx.font = `${s}px ${fontFamily}`;
      }

      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      function handleCanvas() {
        dotList = [];
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let x = 0; x < imgData.width; x += 6) {
          for (let y = 0; y < imgData.height; y += 6) {
            const i = ((y * imgData.width) + x) * 4;
            if (imgData.data[i + 3] > 128 && imgData.data[i] < 100) {
              const dot = new Dot(x, y, 2);
              dotList.push(dot);
            }
          }
        }
      }
      // function draw(ctx, sx, sy) {
      //   ctx.clearRect(0, 0, window.document.body.clientWidth, window.document.body.clientHeight);

      //   ctx.fillStyle = '#000';

      //   for (const item of dotList) {
      //     ctx.save();
      //     ctx.beginPath();
      //     ctx.arc(sx + item.x, sy + item.y, item.radius, 0, 2 * Math.PI);
      //     ctx.fill();
      //     ctx.restore();
      //   }
      // }

      function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }


      function drawAnimate() {
        var curX;
        var curY;
        rafId = window.requestAnimationFrame(drawAnimate);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';

        finishCount = 0;

        for (const item of dotList) {
          if (item.delayCount < item.delay) {
            item.delayCount += 1;
            continue;
          }

          ctx.save();
          ctx.beginPath();

          if (item.frameNum < item.frameCount) {
            curX = easeInOutCubic(item.frameNum, item.sx, item.x - item.sx, item.frameCount);
            curY = easeInOutCubic(item.frameNum, item.sy, item.y - item.sy, item.frameCount);

            ctx.arc(curX, curY, item.radius, 0, 2 * Math.PI);
            item.frameNum += 1;
          } else {
            ctx.arc(item.x, item.y, item.radius, 0, 2 * Math.PI);
            finishCount += 1;
          }

          ctx.fill();
          ctx.restore();

          if (finishCount >= dotList.length) {
            window.cancelAnimationFrame(rafId);
            return;
          }
        }
      }


      function init(word = 'beta') {
        // const imgW = img.width;
        // const imgH = img.height;
        let size = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (rafId) window.cancelAnimationFrame(rafId);

        size = Math.min(fontSize,
            (canvas.width / ctx.measureText(word).width) * 0.8 * fontSize,
            (canvas.height / fontSize) * (isNumber(word) ? 1 : 0.5) * fontSize
          );
        setFontSize(size);

        // const sx = (canvas.width / 2) - (imgW / 2);
        // const sy = (canvas.height / 2) - (imgH / 2);
        // ctx.drawImage(img, sx, sy);
        // const imgData = ctx.getImageData(sx, sy, imgW, imgH);

        ctx.textBaseline = 'top';
        ctx.fillText(word, 10, 0);

        handleCanvas();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw(ctx, sx, sy);
        drawAnimate();
      }

      init();
      // if (img.complete) {
      //   init();
      // } else {
      //   img.onload = () => {
      //     init();
      //   };
      // }

      window.document.querySelector('.input-block').onsubmit = (event) => {
        event.preventDefault();
        init(event.target.querySelector('input').value);
      };
    },
  };
</script>
