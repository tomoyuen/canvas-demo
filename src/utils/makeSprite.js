export default function(color = '#fff', spriteSize = 8) {
  const PI2 = Math.PI * 2;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = canvas.height = spriteSize * 2;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(spriteSize, spriteSize, spriteSize, 0, PI2, true);
  ctx.fill();

  const sprite = new THREE.Texture(canvas);
  sprite.needsUpdate = true;

  return sprite;
}
