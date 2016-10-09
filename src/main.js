/* global window */
/* eslint no-console: off */
/* eslint no-param-reassign: off */
import imgUrl from './assets/images/demo.jpg';

const img = new window.Image();
img.src = imgUrl;

const dotList = [];

class Dot {
  constructor(centerX, centerY, radius) {
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
  }
}

function draw(ctx, sx, sy, dw, dh) {
  ctx.clearRect(0, 0, dw, dh);

  ctx.fillStyle = '#000';

  for (const item of dotList) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(sx + item.x, sy + item.y, item.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}


function init() {
  const canvas = window.document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.document.body.clientWidth;
  canvas.height = window.document.body.clientHeight;


  const imgW = img.width;
  const imgH = img.height;
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

  draw(ctx, sx, sy, canvas.width, canvas.height);
}

if (img.complete) {
  init();
} else {
  img.onload = () => {
    init();
  };
}
