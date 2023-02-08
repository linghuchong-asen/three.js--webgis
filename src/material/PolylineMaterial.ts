/*
 * @Description: 多段线材质
 * @Author: yangsen
 * @Date: 2023-02-06 08:46:31
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-08 08:32:52
 */
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { RGBTranslateHex } from '@/utils/utilFunction';

class PolylineMaterial {
  material: any;
  _color: [number, number, number];
  _lineWidth: number;

  constructor() {
    /* 在ts文件中会要求color传入的类型是number，这里传一个与16进制相等的10进制数值也是可以的。
        接受的参数如果是 number 类型，就不分是不是 16 进制了，只要传的数字正确就可以了; 
        数字也分不出类型，存进去都是 2 进制，只是可以设置以 10 进制、16 进制显示*/
    this._color = [172, 45, 66];
    this._lineWidth = 1;
    this.material = new LineMaterial({ color: parseInt(RGBTranslateHex(this._color), 16), linewidth: this._lineWidth });
    this.material.resolution.set(window.innerWidth, window.innerHeight);
  }
  // 线宽
  /* setter监听class内某个属性的变化，执行某个操作 */
  set lineWidth(value: number) {
    this.material.linewidth = value;
    this._lineWidth = value;
  }
  get lineWidth() {
    return this._lineWidth;
  }
  // 颜色
  set color(value: [number, number, number]) {
    this.material.color = parseInt(RGBTranslateHex(value), 16);
    this._color = value;
  }
  get color() {
    return this._color;
  }
  // 类型
}
export { PolylineMaterial };
