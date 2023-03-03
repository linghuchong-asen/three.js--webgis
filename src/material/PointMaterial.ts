import { PointsMaterial } from 'three';
import { canvasTextureCircle } from '@/common/canvasCircle';
import { Color } from '@/math/Color';
class PointMaterial {
  material: any;
  type: string;
  _size: number;
  constructor() {
    this.material = new PointsMaterial({ map: canvasTextureCircle('red') });
    this.material.transparent = true;
    this.type = 'PointMaterial';
    this._size = 1;
  }
  // 设置颜色
  setColor(color: Color) {
    this.material.map = canvasTextureCircle(color);
  }
  // 设置大小,获取用属性
  setSize(size: number) {
    this.material.size = size;
    this._size = size;
  }
  get size() {
    return this._size;
  }

  // 设置透明度
  setOpacity(opacity: number) {
    this.material.opacity = opacity;
  }
}
export { PointMaterial };
