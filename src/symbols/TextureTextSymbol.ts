import { Vector2 } from 'three/src/math/Vector2.js';
/*
 * @Description:利用canvas创建文字，作为纹理，贴到sprite上
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-11 14:27:31
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-22 13:27:40
 */
import { SpriteMaterial } from 'three/src/materials/SpriteMaterial.js';

import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { Object3D } from 'three/src/core/Object3D.js';
import { CanvasTexture } from 'three/src/textures/CanvasTexture.js';
import { InterleavedBuffer, InterleavedBufferAttribute } from 'three';

let _fontSize: string;
let _globalAlpha: number;

interface GetToolTipCanvasParam {
  text?: string;
  fontColor?: string;
  fontWeight?: number | string;
  fontSize?: string;
  fontFamily?: string;
  bgColor?: string;
  globalAlpha?: number;
}

function getToolTipCanvas(params: GetToolTipCanvasParam) {
  var canvas = document.createElement('canvas');

  var context = canvas.getContext('2d');
  let sw;

  if (context !== null) {
    const color = params.fontColor === undefined ? '#fff' : params.fontColor;
    const fontWeight = params.fontWeight === undefined ? 500 : params.fontWeight;
    const fontSize = params.fontSize === undefined ? '16px' : params.fontSize;
    const fontFamily = params.fontFamily === undefined ? '微软雅黑' : params.fontFamily;
    const globalAlpha = params.globalAlpha === undefined ? 1 : params.globalAlpha;
    const text = params.text === undefined ? '聚米画沙' : params.text;
    const bgColor = params.bgColor === undefined ? '#1890FF' : params.text;

    let width = getCanvasWidth(text, fontSize);

    let boundWidth = width === undefined ? 32 : width + 32; //两边间距16+16

    canvas.width = boundWidth;
    canvas.height = 36;
    //画框子
    fillRoundRect(context, 0, 0, boundWidth, 30, 5, bgColor); //rgba(0,0,0,0.7)

    _globalAlpha = globalAlpha;

    context.globalAlpha = globalAlpha;
    context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    context.textBaseline = 'middle';
    context.fillStyle = color;

    if (width !== undefined) {
      sw = boundWidth / 2.0 - width / 2.0; //计算字体居中的开始位置

      context.fillText(text, sw, parseInt(fontSize.slice(0, -2)) + 2);
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
function fillRoundRect(
  cxt: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillColor?: string,
) {
  //圆的直径必然要小于矩形的宽高
  if (2 * radius > width || 2 * radius > height) {
    return false;
  }

  cxt.save();
  cxt.translate(x, y);
  //绘制圆角矩形的各个边
  drawRoundRectPath(cxt, width, height, radius);
  cxt.fillStyle = fillColor || '#000'; //若是给定了值就用给定的值否则给予默认值
  cxt.fill();
  cxt.restore();
}

function drawRoundRectPath(cxt: CanvasRenderingContext2D, width: number, height: number, radius: number) {
  cxt.beginPath();
  //从右下角顺时针绘制，弧度从0到1/2PI
  cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

  //矩形下边线

  //绘制提示框那个尖尖角，强吧
  cxt.lineTo(width / 2.0 + 4, height);
  cxt.lineTo(width / 2.0, height + 6);
  cxt.lineTo(width / 2.0 - 4, height);

  cxt.lineTo(radius, height);

  //左下角圆弧，弧度从1/2PI到PI
  cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

  //矩形左边线
  cxt.lineTo(0, radius);

  //左上角圆弧，弧度从PI到3/2PI
  cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);

  //上边线
  cxt.lineTo(width - radius, 0);

  //右上角圆弧
  cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);

  //右边线
  cxt.lineTo(width, height - radius);
  cxt.closePath();
}

function getCanvasWidth(text?: string, fontsize?: string) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  let width, boundWidth;
  if (ctx !== null) {
    ctx.font = `${fontsize} 微软雅黑`;
    ctx.textBaseline = 'middle';
    // 可以动态控制提示框宽度
    if (text !== undefined) width = ctx.measureText(text).width;
    boundWidth = width;
  }
  return boundWidth;
}

interface Params {
  x?: number;
  y?: number;
  z?: number;
  text?: string;
  fontFamily?: string;
  fontSize?: string;
  fontColor?: string;
  fontOpacity?: number;
  backgroundColor?: string;
}
let _geometry: undefined | BufferGeometry;

class TextureTextSymbol extends Object3D {
  isSprite: boolean;
  geometry: BufferGeometry;
  material: SpriteMaterial;
  center: Vector2;
  isTextureTextSymbol: boolean;
  x?: number;
  y?: number;
  z?: number;
  text?: string;
  fontFamily?: string;
  fontSize?: string;
  fontColor?: string;
  fontOpacity?: number;
  backgroundColor?: string;

  constructor(params: Params) {
    super();

    this.isSprite = true;
    this.type = 'Sprite';
    this.isTextureTextSymbol = true;

    if (_geometry === undefined) {
      _geometry = new BufferGeometry();

      const float32Array = new Float32Array([
        -0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5, 0, 0, 1,
      ]);

      const interleavedBuffer = new InterleavedBuffer(float32Array, 5);

      _geometry.setIndex([0, 1, 2, 0, 2, 3]);
      _geometry.setAttribute('position', new InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
      _geometry.setAttribute('uv', new InterleavedBufferAttribute(interleavedBuffer, 2, 3, false));
    }

    this.geometry = _geometry;

    if (params !== undefined) {
      this.text = params.text === undefined ? '聚米画沙' : params.text;
      this.fontFamily = params.fontFamily === undefined ? 'arial' : params.fontFamily;
      this.fontSize = params.fontSize === undefined ? '16px' : params.fontSize;
      this.fontColor = params.fontColor === undefined ? '#ffffff' : params.fontColor;
      this.fontOpacity = params.fontOpacity === undefined ? 1 : params.fontOpacity;
      this.backgroundColor = params.backgroundColor === undefined ? '#1890FF' : params.backgroundColor;

      this.material = new SpriteMaterial({ map: getToolTipCanvas({}) });
    } else {
      this.material = new SpriteMaterial({ map: getToolTipCanvas({}) });
    }

    this.center = new Vector2(0.5, 0.5);
  }
  // 颜色 位置 大小 字体 透明度

  /**
   * @@description: 设置文字颜色
   * @param {string} color
   */
  setFontColor(color: string) {
    this.material.map = getToolTipCanvas({ fontColor: color });
  }
  /**
   * @@description: 设置背景颜色
   * @param {string} color
   */
  setBgColor(color: string) {
    this.material.map = getToolTipCanvas({ bgColor: color });
  }
  /**
   * @@description: 设置文字大小
   * @param {number} size
   */
  /*  setSize(size: string) {
    this.material.map = canvasText({ fontSize: size });
  } */
  /**
   * @@description: 获取字体大小
   */
  getSize() {
    return _fontSize;
  }
  /**
   * @@description: 文字的缩放
   * @param {number} scale
   */
  /*  setScale(scale: number) {
    this.material.map = canvasText({ fontSize: (parseInt(_fontSize.slice(0, -2), 10) * scale).toString() + 'px' });
  } */
  /**
   * @@description: 设置透明度
   * @param {number} opacity
   */
  /* setOpacity(opacity: number) {
    this.material.map = canvasText({ globalAlpha: opacity });
  } */
  getOpacity() {
    return _globalAlpha;
  }
}

export { TextureTextSymbol };
