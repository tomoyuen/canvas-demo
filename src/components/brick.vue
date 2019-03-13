<template>
  <div></div>
</template>
<script>
  /* eslint no-param-reassign: off */
  var unitLength = 20; // 单位长度，砖块的宽高比为2：1

  /* 颜色基值 */
  var colorR = 170,
    colorG = 0,
    colorB = 0;

  function createRGB(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  function drawPerHorizontalRow(ctx, nowW, nowH, limitW, limitH, penPointX, penPointY, startX) {
    while (nowW <= limitW && nowH < limitH) {
      ctx.fillStyle = createRGB(colorR, colorG + penPointX / 2, colorB + penPointY / 2);
      ctx.fillRect(penPointX, penPointY, unitLength * 2, unitLength);

      nowW = nowW === startX ? nowW + unitLength * 2 : nowW + unitLength;
      nowH += unitLength;
      penPointX = nowW - unitLength;
      penPointY = nowH;
    }
  }
  function drawHorizontal(ctx, totalW, totalH) {
    let startX = 0;
    let startY = 0;

    let nowW = startX;
    let nowH = startY;

    let penPointX = startX;
    let penPointY = startY;

    var limitW = totalW - unitLength;
    var limitH = totalH - unitLength;

    while (startY < totalH - unitLength) {
      nowW = 0;
      nowH = startY;
      penPointX = 0;
      penPointY = startY;
      drawPerHorizontalRow(ctx, nowW, nowH, limitW, limitH, penPointX, penPointY, startX);
      startY += unitLength * 4;
    }

    startX = unitLength * 4;
    while (startX <= totalW - unitLength * 2) {
      nowW = startX;
      nowH = 0;
      penPointX = startX;
      penPointY = 0;
      drawPerHorizontalRow(ctx, nowW, nowH, limitW, limitH, penPointX, penPointY, startX);
      startX += unitLength * 4;
    }
  }

  function drawPerVerticalRow(ctx, nowW, nowH, limitW, limitH, penPointX, penPointY, startY) {
    while (nowW <= limitW && nowH <= limitH) {
      ctx.fillStyle = createRGB(colorR, colorG + penPointX / 2, colorB + penPointY / 2);
      ctx.fillRect(penPointX, penPointY, unitLength, unitLength * 2);
      nowH = nowH === startY ? nowH + unitLength * 2 : nowH + unitLength;
      nowW += unitLength;
      penPointX = nowW;
      penPointY = nowH - unitLength;
    }
  }

  function drawVertical(ctx, totalW, totalH) {
    let startX = 0;
    let startY = unitLength;
    let nowW = startX;
    let nowH = startY;
    let penPointX = startX;
    let penPointY = startY;
    const limitW = totalW - unitLength;
    const limitH = totalH - unitLength;

    while (startY <= totalH - unitLength * 2) {
      nowW = 0;
      nowH = startY;
      penPointX = 0;
      penPointY = startY;
      drawPerVerticalRow(ctx, nowW, nowH, limitW, limitH, penPointX, penPointY, startY);
      startY += unitLength * 4;
    }

    startX = unitLength * 3;
    startY = 0;
    while (startX <= totalW - unitLength) {
      nowW = startX;
      nowH = 0;
      penPointX = startX;
      penPointY = 0;
      drawPerVerticalRow(ctx, nowW, nowH, limitW, limitH, penPointX, penPointY, startY);
      startX += unitLength * 4;
    }
  }

  function init(container) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = 500;
    drawHorizontal(context, 500, 500);
    drawVertical(context, 500, 500);

    container.appendChild(canvas);
  }

  export default {
    mounted() {
      init(this.$el);
    },
  };
</script>
