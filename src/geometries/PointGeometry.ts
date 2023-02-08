// import { Float32BufferAttribute } from './../../types/three/src/core/BufferAttribute.d';
/*
 * @Description: 点
 * @Author: yangsen
 * @Date: 2023-02-08 09:12:23
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-08 15:32:02
 */

import { BufferGeometry, Float32BufferAttribute } from 'three';

class PointGeometry {
  geometry: any;
  type: string;
  constructor() {
    this.geometry = new BufferGeometry();
    this.type = 'pointGeometry';
  }
  // 设置点位置
  setPosition(position: [number, number, number]) {
    this.geometry.setAttribute('position', new Float32BufferAttribute(position, 3));
  }
}
export { PointGeometry };
