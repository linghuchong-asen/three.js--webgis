/*
 * @Description:广告牌
 * @Author: yangsen
 * @Date: 2023-02-14 17:54:55
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-23 10:17:22
 */
import { SpriteMaterial, TextureLoader } from 'three';
import { LabelMaterial } from './LabelMaterial';
import { Color } from '@/math/Color';

class BillboardMaterial {
  type: string;
  material: any;
  _image: string;
  textMaterial: any;

  constructor() {
    this.type = 'billboardMaterial';
    this._image = '';
    this.material = new SpriteMaterial();
    this.material.alphaTest = 1;
    this.textMaterial = new LabelMaterial();
  }
  // 图片
  set image(url: string) {
    const map = new TextureLoader().load(url);
    this.material.map = map;
    this._image = url;
  }
  get image() {
    return this._image;
  }
  // 文字内容
  get text() {
    return this.textMaterial.text;
  }
  set text(value: string | undefined) {
    this.textMaterial.text = value;
  }
  // 文字大小
  get textFontSize() {
    return this.textMaterial.fontSize;
  }
  set textFontSize(value: string | undefined) {
    this.textMaterial.fontSize = value;
  }
  // 文字颜色
  get textFillColor() {
    return this.textMaterial.fillColor;
  }
  set textFillColor(value: Color | undefined) {
    this.textMaterial.fillColor = value;
  }
  // 边框颜色
  get textOutlineColor() {
    return this.textMaterial.outlineColor;
  }
  set textOutlineColor(value: Color | undefined) {
    this.textMaterial.outlineColor = value;
  }
  // 文字是否填充
  get textIsFill() {
    return this.textMaterial.isFill;
  }
  set textIsFill(value: boolean | undefined) {
    this.textMaterial.isFill = value;
  }
  // 文字是否有边框
  get textIsOutline() {
    return this.textMaterial.isOutline;
  }
  set textIsOutline(value: boolean | undefined) {
    this.textMaterial.isOutline = value;
  }
  // 文字边框宽度
  get textOutlineWidth() {
    return this.textMaterial.outlineWidth;
  }
  set textOutlineWidth(value: number | undefined) {
    this.textMaterial.outlineWidth = value;
  }
}
export { BillboardMaterial };
