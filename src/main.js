/* global window */
/* eslint no-console: off */
import imgUrl from './assets/images/demo.jpg';

const img = new window.Image();
img.src = imgUrl;

function init() {
  const canvas = window.document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  console.log(ctx);
}

if (img.complete) {
  init();
} else {
  img.onload = () => {
    init();
  };
}
