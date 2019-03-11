<template>
  <div></div>
</template>

<script>
  import frame from '../assets/images/picture-frame.jpg';
  import img from '../assets/images/tfboys.jpg';

  function drawCanvas(frameImg, picImg) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 500;
    document.getElementById('app').appendChild(canvas);

    const context = canvas.getContext('2d');

    const frameWidth = 350;
    const frameHeight = 401;

    const picWidth = 218;
    const picHeight = 275;

    context.drawImage(frameImg, 0, 0, frameWidth, frameHeight);
    context.drawImage(picImg, 40, 5, picWidth, picHeight, 65, 58, picWidth, picHeight);

    context.drawImage(frameImg, frameWidth, 0, frameWidth, frameHeight);
    context.drawImage(picImg, 390, 5, picWidth, picHeight, frameWidth + 65, 58, picWidth, picHeight);

    context.drawImage(frameImg, frameWidth * 2, 0, frameWidth, frameHeight);
    context.drawImage(
      picImg,
      750,
      5,
      picWidth,
      picHeight,
      frameWidth * 2 + 65,
      58,
      picWidth,
      picHeight);
  }

  const frameGetPromise = new Promise((resolve) => {
    const frameImg = new window.Image();
    frameImg.src = frame;
    frameImg.onload = () => {
      resolve(frameImg);
    };
  });

  const picGetPromise = new Promise((resolve) => {
    const picImg = new window.Image();
    picImg.src = img;
    picImg.onload = () => {
      resolve(picImg);
    };
  });

  export default {
    mounted() {
      Promise.all([frameGetPromise, picGetPromise]).then((imgs) => {
        drawCanvas(imgs[0], imgs[1]);
      });
    }
  }
</script>
