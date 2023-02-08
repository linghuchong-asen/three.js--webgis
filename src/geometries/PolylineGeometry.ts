/*
 * @Description: 多段线
 * @Author: yangsen
 * @Date: 2023-02-06 08:43:21
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-07 16:37:31
 */
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

class PolylineGeometry {
  geometry: any;
  type: string;

  constructor() {
    this.geometry = new LineGeometry();
    this.type = 'line2';
  }
  setPath(path: number[]) {
    const isRightLength = path.length % 3 === 0 ? true : false;
    if (!isRightLength) {
      throw new Error('传入线段路径点数组长度错误,需要是3的整数倍');
    } else {
      this.geometry.setPositions(path);
    }
  }
}
export { PolylineGeometry };
