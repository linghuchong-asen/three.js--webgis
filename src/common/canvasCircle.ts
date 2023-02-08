import { CanvasTexture } from 'three/src/textures/CanvasTexture.js';

export const canvasTextureCircle = (color: any) => {
  const canvas = document.createElement('canvas');
  // 不设置canvas的宽高的话，在three.js中会形成椭圆
  canvas.width = 10;
  canvas.height = 10;
  const ctx = canvas.getContext('2d');
  if (ctx !== null) {
    ctx.fillStyle = color;
    ctx.arc(5, 5, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};
