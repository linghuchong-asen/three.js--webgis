/*
 * @Description: 点
 * @Author: yangsen
 * @Date: 2023-02-08 09:12:23
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-06 21:05:42
 */

import { BufferGeometry, Float32BufferAttribute, Vector3 } from 'three';

class PointGeometry {
  geometry: any;
  type: string;
  constructor() {
    this.geometry = new BufferGeometry();
    this.type = 'pointGeometry';
  }
  _position = new Vector3(0, 0, 0);
  get position() {
    return this._position;
  }
  set position(value: Vector3) {
    const position = [value.x, value.y, value.z];
    this.geometry.setAttribute('position', new Float32BufferAttribute(position, 3));
  }
}
export { PointGeometry };
