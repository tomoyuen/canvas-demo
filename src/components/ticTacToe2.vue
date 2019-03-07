<template>
  <div></div>
</template>

<script>
  var margin = 50,
    padding = 30,
    width = 450,
    height = 450,
    circleRadius = (width / 3 / 2) - padding;

  function drawChessboard(ctx) {
    ctx.strokeRect(margin, margin, width, height);
    ctx.beginPath();
    // 横线
    ctx.moveTo(margin, margin + (height / 3));
    ctx.lineTo(margin + width, margin + (height / 3));
    ctx.moveTo(margin, margin + ((height * 2) / 3));
    ctx.lineTo(margin + width, margin + ((height * 2) / 3));
    // 竖线
    ctx.moveTo(margin + (width / 3), margin);
    ctx.lineTo(margin + (width / 3), margin + height);
    ctx.moveTo(margin + ((width * 2) / 3), margin);
    ctx.lineTo(margin + ((width * 2) / 3), margin + height);
    ctx.stroke();
  }

  function createCircle() {
    const circle = new window.Path2D();
    circle.arc(margin + (width / 6), margin + (height / 6), circleRadius, 0, Math.PI * 2);
    return circle;
  }

  function createCross() {
    const cross = new window.Path2D();
    cross.moveTo(margin + padding, margin + padding);
    cross.lineTo(margin + (width / 3) - padding, margin + (height / 3) - padding);
    cross.moveTo(margin + (width / 3) - padding, margin + padding);
    cross.lineTo(margin + padding, margin + (height / 3) - padding);

    return cross;
  }

  function resetContextStatus(ctx) {
    ctx.restore();
    ctx.save();
  }

  function drawChesspiece(ctx) {
    const circle = createCircle();
    const cross = createCross();

    ctx.save();
    ctx.translate(width / 3, height / 3);
    ctx.stroke(cross);
    resetContextStatus(ctx);
    ctx.stroke(circle);
    resetContextStatus(ctx);
    ctx.translate(width / 3, 0);
    ctx.stroke(cross);
    resetContextStatus(ctx);
    ctx.translate(width / 3, height * 2 / 3);
    ctx.stroke(circle);
    resetContextStatus(ctx);
    ctx.translate(0, height * 2 / 3);
    ctx.stroke(cross);
    resetContextStatus(ctx);
    ctx.translate(width * 2 / 3, 0);
    ctx.stroke(circle);
    resetContextStatus(ctx);
    ctx.translate(width * 2 / 3, height / 3);
    ctx.stroke(cross);
    resetContextStatus(ctx);
    ctx.translate(0, height / 3);
    ctx.stroke(circle);
  }

  function drawCanvas() {
    var canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    document.getElementById('app').appendChild(canvas);
    const context = canvas.getContext('2d');
    drawChessboard(context);
    drawChesspiece(context);
  }

  export default {
    mounted() {
      drawCanvas();
    },
  };
</script>
