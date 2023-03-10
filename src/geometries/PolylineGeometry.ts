/*
 * @Description: 多段线
 * @Author: yangsen
 * @Date: 2023-02-06 08:43:21
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-06 18:21:02
 */
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { Vector3 } from 'three';

class PolylineGeometry {
  geometry: any;
  type: string;

  constructor() {
    this.geometry = new LineGeometry();
    this.type = 'line2';
  }
  setPath(path: Vector3[]) {
    const positionArr: number[] = [];
    path.forEach((item) => {
      positionArr.push(item.x);
      positionArr.push(item.y);
      positionArr.push(item.z);
    });
    this.geometry.setPositions(positionArr);
  }
}
export { PolylineGeometry };
