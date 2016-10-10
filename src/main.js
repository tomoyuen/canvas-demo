/* global window */
/* eslint no-console: off */
/* eslint no-param-reassign: off */
/* eslint no-var: off */
/* eslint no-cond-assign: off */
/* eslint no-mixed-operators: off */
/* eslint no-continue: off */
import imgUrl from './assets/images/demo.jpg';

const dotList = [];
var finishCount = 0;
var ctx = null;
var rafId = null;

const img = new window.Image();
img.src = imgUrl;

class Dot {
  constructor(centerX, centerY, radius) {
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
    this.frameNum = 0;
    this.frameCount = Math.ceil(3000 / 16.66);
    this.sx = 400;
    this.sy = 400;
    this.delay = this.frameCount * Math.random();
    this.delayCount = 0;
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

  ctx.clearRect(0, 0, window.document.body.clientWidth, window.document.body.clientHeight);
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


function init() {
  const imgW = img.width;
  const imgH = img.height;
  const canvas = window.document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.document.body.clientWidth;
  canvas.height = window.document.body.clientHeight;

  const sx = (canvas.width / 2) - (imgW / 2);
  const sy = (canvas.height / 2) - (imgH / 2);
  ctx.drawImage(img, sx, sy);
  const imgData = ctx.getImageData(sx, sy, imgW, imgH);

  for (let x = 0; x < imgData.width; x += 6) {
    for (let y = 0; y < imgData.height; y += 6) {
      const i = ((y * imgData.width) + x) * 4;
      if (imgData.data[i + 3] > 128 && imgData.data[i] < 100) {
        const dot = new Dot(x, y, 2);
        dotList.push(dot);
      }
    }
  }

  // draw(ctx, sx, sy);
  drawAnimate();
}

if (img.complete) {
  init();
} else {
  img.onload = () => {
    init();
  };
}
