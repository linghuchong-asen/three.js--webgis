/*
 * @Description: 用canvas画文字。支持设置：文字内容，字体，大小,文字粗细；颜色；边框
 * @Author: yangsen
 * @Date: 2023-02-10 16:46:01
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-22 11:03:56
 */

import { CanvasTexture, UVMapping, ClampToEdgeWrapping, LinearFilter, RGBAFormat, UnsignedByteType } from 'three';
import { Color } from '@/math/Color';

interface CreateCanvasTextParam {
  text?: string;
  fontSize?: string;
  fillColor?: Color;
  outlineColor?: Color;
  isFill?: boolean;
  isOutline?: boolean;
  outlineWidth?: number;
}
/* 创建canvas文字 */
export const createCanvasText = (param: CreateCanvasTextParam) => {
  const canvas = document.createElement('canvas');
  const text = param.text === undefined ? 'canvas文字' : param.text;
  const fontSize = param.fontSize === undefined ? '150px' : param.fontSize;
  const fillColor = param.fillColor === undefined ? new Color(241, 242, 246, 1) : param.fillColor;
  const outlineColor = param.outlineColor === undefined ? new Color(241, 196, 15) : param.outlineColor;
  const isFill = param.isFill === undefined ? true : param.isFill;
  const isOutline = param.isOutline === undefined ? false : param.isOutline;
  const outlineWidth = param.outlineWidth === undefined ? 1 : param.outlineWidth;

  const width = measureTextWidth(text, fontSize);
  const height = parseInt(fontSize.slice(0, -2));
  // 左右留空
  const aboutPadding = 16;
  // 上下留空
  const upDownPadding = 10;
  canvas.width = width + 2 * aboutPadding;
  canvas.height = height + 2 * upDownPadding;

  const ctx = canvas.getContext('2d');
  if (ctx !== null) {
    ctx.fillStyle = `rgba(${fillColor.r * 255},${fillColor.g * 255},${fillColor.b * 255},${fillColor.alpha})`;
    ctx.strokeStyle = `rgba(${outlineColor.r * 255},${outlineColor.g * 255},${outlineColor.b * 255},${
      outlineColor.alpha
    })`;
    ctx.lineWidth = outlineWidth;
    ctx.font = `normal ${fontSize} 微软雅黑`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 空心字
    if (isOutline) ctx.strokeText(text, width / 2 + aboutPadding, (height + upDownPadding) / 2);
    // 实心字
    if (isFill) ctx.fillText(text, width / 2 + aboutPadding, (height + upDownPadding) / 2);
  }
  const texture = new CanvasTexture(
    canvas,
    UVMapping,
    ClampToEdgeWrapping,
    ClampToEdgeWrapping,
    LinearFilter,
    LinearFilter,
    RGBAFormat,
    UnsignedByteType,
    4,
  );
  return texture;
};

/* 获取canvas画布中指定文字的宽度 */
const measureTextWidth = (text: string, fontSize: string): number => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let width!: number;
  if (ctx !== null) {
    ctx.font = `normal ${fontSize} 微软雅黑`;
    ctx.textBaseline = 'middle';
    width = ctx.measureText(text).width;
  }
  return width;
};
