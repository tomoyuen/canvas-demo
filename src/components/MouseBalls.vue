<template>
  <div></div>
</template>

<style>
  .ball {
    pointer-events: none;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: gray;
    animation: implode 1s ease-in-out;
    animation-fill-mode: both;
    opacity: .5;
  }
  @keyframes implode {
    100% {
      transform: scale(0);
    }
  }
</style>
<script>
  /*
   * code from: http://codepen.io/renatorib/pen/gBLDA
   */
  export default {
    data() {
      return {
        interval: null,
      };
    },
    mounted() {
      const mousePos = {};

      function getRandomInt(min, max) {
        return Math.round(Math.random() * ((max - min) + 1)) + min;
      }

      window.document.addEventListener('mousemove', (e) => {
        mousePos.x = e.pageX;
        mousePos.y = e.pageY;
      });

      window.document.addEventListener('mouseleave', () => {
        mousePos.x = -1;
        mousePos.y = -1;
      });

      this.$el.style.backgroundColor = '#222';

      this.interval = setInterval(() => {
        if (mousePos.x > 0 && mousePos.y > 0) {
          const range = 15;
          const color = `background: rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)});`;
          const sizeInt = getRandomInt(10, 30);
          const size = `height: ${sizeInt}px; width: ${sizeInt}px;`;
          const left = `left: ${getRandomInt(mousePos.x - range - sizeInt, mousePos.x + range)}px;`;
          const top = `top: ${getRandomInt(mousePos.y - range - sizeInt, mousePos.y + range)}px;`;
          const style = left + top + color + size;

          const ball = window.document.createElement('div');
          ball.style = style;
          ball.classList.add('ball');
          this.$el.appendChild(ball).addEventListener('animationend', () => {
            ball.remove();
          }, { once: true });
        }
      }, 1);
    },
    destroyed() {
      this.$el.style.backgroundColor = 'none';
      clearInterval(this.interval);
    }
  };
</script>
