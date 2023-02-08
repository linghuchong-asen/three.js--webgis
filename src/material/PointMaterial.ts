import { PointsMaterial } from 'three';
import { canvasTextureCircle } from '@/common/canvasCircle';
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
  setColor(color: [number, number, number]) {
    this.material.map = canvasTextureCircle(`rgb(${(color[0], color[1], color[2])})`);
  }
  // 设置大小,获取用属性
  setSize(size: number) {
    this.material.size = size;
    this._size = size;
  }
  get size() {
    return this._size;
  }
  // 缩放
  setScale(scale: number) {
    this.material.size = this._size * scale;
  }
  // 设置透明度
  setOpacity(opacity: number) {
    this.material.opacity = opacity;
  }
}
export { PointMaterial };
