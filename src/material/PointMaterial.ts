import { PointsMaterial } from 'three';
import { canvasTextureCircle } from '@/common/canvasCircle';
import { Color } from '@/math/Color';
class PointMaterial {
  material: any;
  type: string;
  constructor() {
    this.material = new PointsMaterial({ map: canvasTextureCircle(this._color) });
    this.material.transparent = true;
    this.type = 'PointMaterial';
  }
  _size = 1;
  _color = new Color(217, 54, 57, 1);
  get color() {
    return this._color;
  }
  // 设置颜色
  set color(value: Color) {
    this.material.map = canvasTextureCircle(value);
    this._color = value;
  }
  get size() {
    return this._size;
  }
  // 设置大小,获取用属性
  set size(size: number) {
    this.material.size = size;
    this._size = size;
  }

  // 设置透明度
  setOpacity(opacity: number) {
    this.material.opacity = opacity;
  }
}
export { PointMaterial };
