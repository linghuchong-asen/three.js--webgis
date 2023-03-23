/*
 * @Description:文字
 * @Author: yangsen
 * @Date: 2023-02-13 10:01:07
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-23 13:20:24
 */
/* 文字内容，字体，大小,文字粗细，颜色；边框；，显示隐藏  |缩放，偏移量(用平移实现),位置，旋转 */
import { createCanvasText } from '@/common/canvasText';
import { SpriteMaterial } from 'three';
import { Color } from '@/math/Color';

class LabelMaterial {
  type: string;
  material: any;
  _text: string | undefined;
  _fontSize: number | undefined;
  _isFill: boolean | undefined;
  _isOutline: boolean | undefined;
  _fillColor: Color | undefined;
  _outlineColor: Color | undefined;
  _outlineWidth: number | undefined;
  _show: boolean | undefined;
  constructor() {
    this.type = 'labelMaterial';
    this._fontSize = undefined;
    this._isFill = true;
    this._isOutline = false;
    this._fillColor = undefined;
    this._outlineColor = undefined;
    this._show = true;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        fontSize: this._fontSize,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineWidth: this._outlineWidth,
        outlineColor: this._outlineColor,
      }),

      alphaTest: 1,
    });
  }
  // 文字内容
  get text() {
    return this._text;
  }
  set text(value: string | undefined) {
    this._text = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        fontSize: this._fontSize,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineWidth: this._outlineWidth,
        outlineColor: this._outlineColor,
      }),

      alphaTest: 1,
    });
  }
  // 文字大小
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(value: number | undefined) {
    this._fontSize = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        fontSize: this._fontSize,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineWidth: this._outlineWidth,
        outlineColor: this._outlineColor,
      }),

      alphaTest: 1,
    });
  }
  // 文字颜色
  get fillColor() {
    return this._fillColor;
  }
  set fillColor(value: Color | undefined) {
    this._fillColor = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        fontSize: this._fontSize,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineWidth: this._outlineWidth,
        outlineColor: this._outlineColor,
      }),

      alphaTest: 1,
    });
  }
  // 边框颜色
  get outlineColor() {
    return this._outlineColor;
  }
  set outlineColor(value: Color | undefined) {
    this._outlineColor = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        fontSize: this._fontSize,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineWidth: this._outlineWidth,
        outlineColor: this._outlineColor,
      }),

      alphaTest: 1,
    });
  }
  // 文字是否填充
  get isFill() {
    return this._isFill;
  }
  set isFill(value: boolean | undefined) {
    this._isFill = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        fontSize: this._fontSize,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineColor: this._outlineColor,
        outlineWidth: this._outlineWidth,
      }),

      alphaTest: 1,
    });
  }
  // 文字是否有边框
  get isOutline() {
    return this._isOutline;
  }
  set isOutline(value: boolean | undefined) {
    this._isOutline = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        fontSize: this._fontSize,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineColor: this._outlineColor,
        outlineWidth: this._outlineWidth,
      }),

      alphaTest: 1,
    });
  }
  // 文字边框宽度
  get outlineWidth() {
    return this._outlineWidth;
  }
  set outlineWidth(value: number | undefined) {
    this._outlineWidth = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        fontSize: this._fontSize,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineColor: this._outlineColor,
        outlineWidth: this._outlineWidth,
      }),

      alphaTest: 1,
    });
  }
}
export { LabelMaterial };
