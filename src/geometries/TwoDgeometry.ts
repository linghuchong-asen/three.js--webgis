/*
 * @Description: 用于显示html元素，2D元素
 * @Author: yangsen
 * @Date: 2023-03-29 08:58:00
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-29 09:04:22
 */
import { Vector3 } from 'three';
class TwoDGeometry {
  position: Vector3;
  constructor(position: Vector3) {
    this.position = position;
  }
  type = 'twoDGeometry';
}
export { TwoDGeometry };
