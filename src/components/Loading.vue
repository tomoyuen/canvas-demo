<script>
 /* eslint no-param-reassign: off */
  var canvasWidth = 0;
  var canvasHeight = 0;
  var radius = 150;
  var ringColor = '#49f';
  var wordingColor = '#eee';

  function drawRing(ctx) {
    ctx.strokeStyle = ringColor;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(canvasWidth / 2, canvasHeight / 2, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }

  function drawIndicator(ctx, percent) {
    const indicatorAngle = Math.PI * 2 / 100 * percent;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = ringColor;
    ctx.arc(canvasWidth / 2, canvasHeight / 2, radius, 0, indicatorAngle);
    ctx.stroke();
  }

  function drawWording(ctx, percent) {
    ctx.fillStyle = wordingColor;
    ctx.font = '48px serif';
    ctx.fillText(`${Math.floor(percent)}%`, canvasWidth / 2 - 35, canvasHeight / 2 + 20);
  }

  function cleanCanvas(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  function calculatePercent(timestamp) {
    var percent = timestamp / 100;
    if (percent > 100) {
      return 100;
    }
    return percent;
  }

  function createStep(ctx) {
    return function step(timestamp) {
      const percent = calculatePercent(timestamp);
      cleanCanvas(ctx);
      drawRing(ctx);
      drawIndicator(ctx, percent);
      drawWording(ctx, percent);
      if (percent === 1000) {
        return false;
      }
      window.requestAnimationFrame(createStep(ctx));
      return undefined;
    };
  }

  function drawCanvas() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 500;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    window.requestAnimationFrame(createStep(ctx));
    document.getElementById('app').appendChild(canvas);
  }

  export default {
    mounted() {
      drawCanvas();
    },
  };
</script>
