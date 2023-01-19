/*
 * @Description: 颜色
 * @Author: yangsen
 * @Date: 2022-08-12 15:46:43
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-17 11:06:04
 */
import { Color as ThreeColor } from 'three/src/math/Color.js';

class Color extends ThreeColor {
  constructor(R: number, G: number, B: number) {
    super();
    this.r = R / 255;
    this.g = G / 255;
    this.b = B / 255;
  }
}
export { Color };
