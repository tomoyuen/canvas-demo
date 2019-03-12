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

  function drawChesspiece(ctx) {
    ctx.beginPath();
    ctx.arc(margin + (width / 2), margin + (height / 2), circleRadius, 0, Math.PI * 2);
    ctx.moveTo(margin + padding, margin + padding);
    ctx.lineTo(margin + (width / 3) - padding, margin + (height / 3) - padding);
    ctx.moveTo(margin + (width / 3) - padding, margin + padding);
    ctx.lineTo(margin + padding, margin + (height / 3) - padding);
    ctx.stroke();
  }

  function drawCanvas(container) {
    var canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    container.appendChild(canvas);
    const context = canvas.getContext('2d');
    drawChessboard(context);
    drawChesspiece(context);
  }

  export default {
    mounted() {
      drawCanvas(this.$el);
    },
  };
</script>
