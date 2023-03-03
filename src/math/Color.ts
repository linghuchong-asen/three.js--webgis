/*
 * @Description: 颜色
 * @Author: yangsen
 * @Date: 2022-08-12 15:46:43
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-02 11:19:49
 */
import { Color as ThreeColor } from 'three/src/math/Color.js';

class Color extends ThreeColor {
  alpha: number;
  constructor(r: number, g: number, b: number, a?: number) {
    super(r / 255, g / 255, b / 255);
    this.alpha = a === undefined ? 1 : a;
  }
}
export { Color };
