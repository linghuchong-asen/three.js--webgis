/*
 * @Description: 广告牌
 * @Author: yangsen
 * @Date: 2023-02-14 17:55:11
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-14 18:08:36
 */
import { Vector3 } from 'three';

class BillboardGeometry {
  type: string;
  position: Vector3;
  constructor() {
    this.type = 'billboardGeometry';
    this.position = new Vector3(0, 0, 0);
  }
}
export { BillboardGeometry };
