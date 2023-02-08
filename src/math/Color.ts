/*
 * @Description: 颜色
 * @Author: yangsen
 * @Date: 2022-08-12 15:46:43
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-07 10:15:46
 */
import { Color as ThreeColor } from 'three/src/math/Color.js';

class Color extends ThreeColor {
  constructor(r: number, g: number, b: number) {
    super(r / 255, g / 255, b / 255);
  }
}
export { Color };
