/*
 * @Description:文字
 * @Author: yangsen
 * @Date: 2023-02-13 10:01:07
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-02 20:57:23
 */
/* 文字内容，字体，大小,文字粗细，颜色；边框；，显示隐藏  |缩放，偏移量(用平移实现),位置，旋转 */
import { createCanvasText } from '@/common/canvasText';
import { SpriteMaterial } from 'three';
import { Color } from '@/math/Color';

class LabelMaterial {
  type: string;
  material: any;
  _text: string | undefined;
  _font: string | undefined;
  _isFill: boolean | undefined;
  _isOutline: boolean | undefined;
  _fillColor: Color | undefined;
  _outlineColor: Color | undefined;
  _outlineWidth: number | undefined;
  _show: boolean | undefined;
  constructor() {
    this.type = 'labelMaterial';
    this._font = undefined;
    this._isFill = undefined;
    this._isOutline = undefined;
    this._fillColor = undefined;
    this._outlineColor = undefined;
    this._show = true;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        font: this._font,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineWidth: this._outlineWidth,
        outlineColor: this._outlineColor,
      }),
    });
  }
  // 文字内容
  set text(value: string) {
    this._text = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        font: this._font,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineWidth: this._outlineWidth,
        outlineColor: this._outlineColor,
      }),
    });
  }
  // 文字样式
  set font(value: string) {
    this._font = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        font: this._font,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineWidth: this._outlineWidth,
        outlineColor: this._outlineColor,
      }),
    });
  }
  // 文字颜色
  set fillColor(value: Color) {
    this._fillColor = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        font: this._font,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineWidth: this._outlineWidth,
        outlineColor: this._outlineColor,
      }),
    });
  }
  // 边框颜色
  set outlineColor(value: Color) {
    this._outlineColor = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        font: this._font,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineWidth: this._outlineWidth,
        outlineColor: this._outlineColor,
      }),
    });
  }
  // 文字是否填充
  set isFill(value: boolean) {
    this._isFill = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        font: this._font,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineColor: this._outlineColor,
        outlineWidth: this._outlineWidth,
      }),
    });
  }
  // 文字是否有边框
  set isOutline(value: boolean) {
    this._isOutline = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        font: this._font,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineColor: this._outlineColor,
        outlineWidth: this._outlineWidth,
      }),
    });
  }
  // 文字边框宽度
  set outlineWidth(value: number) {
    this._outlineWidth = value;
    this.material = new SpriteMaterial({
      map: createCanvasText({
        text: this._text,
        font: this._font,
        isFill: this._isFill,
        isOutline: this._isOutline,
        fillColor: this._fillColor,
        outlineColor: this._outlineColor,
        outlineWidth: this._outlineWidth,
      }),
    });
  }
}
export { LabelMaterial };
