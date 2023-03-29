/*
 * @Description:文字。设置位置,缩放，偏移量，旋转
 * @Author: yangsen
 * @Date: 2023-02-13 09:59:13
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-29 11:39:05
 */
import { Vector3 } from 'three';
class LabelGeometry {
  type: string;
  position: Vector3;
  scale: Vector3;
  offset: Vector3;
  constructor() {
    this.type = 'labelGeometry';
    this.position = new Vector3(0, 0, 0);
    this.scale = new Vector3(1, 1, 1);
    this.offset = new Vector3(0, 0, 0);
  }
}
export { LabelGeometry };
