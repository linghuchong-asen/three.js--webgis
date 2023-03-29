/*
 * @Description: 多边形；拉伸柱体
 * @Author: yangsen
 * @Date: 2023-01-29 21:10:03
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-28 08:57:56
 */
import { Shape, Path, Vector2, BufferGeometry, Vector3 } from 'three';

class PolygonGeometry {
  positionArr: Vector3[];
  height: number;
  outline: any;
  wall: any;

  constructor(positionArr: Vector3[]) {
    this.positionArr = positionArr; // 传入的路径点(底面)
    this.createGeometry();
    this.height = 0;
  }
  type = 'polygonGeometry';
  private shape = new Shape();
  geometry = new BufferGeometry();
  positionArrTranslate: Vector3[] = []; // 路径点沿法线平移指定路径后的点(顶面路径点)

  private createGeometry() {
    const geometry = new BufferGeometry();
    const geometryPosition: Vector3[] = [];
    this.positionArr.forEach((item, index) => {
      if (index < this.positionArr.length - 2) {
        geometryPosition.push(this.positionArr[0]);
        geometryPosition.push(this.positionArr[index + 1]);
        geometryPosition.push(this.positionArr[index + 2]);
      }
    });
    geometry.setFromPoints(geometryPosition);

    this.geometry = geometry;
  }
  // 设置厚度
  stretch(thickness: number) {
    // const positionArrTranslate: Vector3[] = [];
    const vector1 = new Vector3(0, 0, 0);
    const vector2 = new Vector3(0, 0, 0);
    vector1.subVectors(this.positionArr[1], this.positionArr[0]);
    vector2.subVectors(this.positionArr[2], this.positionArr[0]);
    const normal = new Vector3(); // 法线
    normal.crossVectors(vector1, vector2).normalize().multiplyScalar(thickness);
    this.positionArr.forEach((item) => {
      this.positionArrTranslate.push(new Vector3().copy(item).add(normal));
    });

    const geometry = new BufferGeometry();
    const geometryPosition: Vector3[] = [];
    // 底面
    this.positionArr.forEach((item, index) => {
      if (index < this.positionArr.length - 2) {
        geometryPosition.push(this.positionArr[0]);
        geometryPosition.push(this.positionArr[index + 1]);
        geometryPosition.push(this.positionArr[index + 2]);
      }
    });
    // 顶面
    this.positionArrTranslate.forEach((item, index) => {
      if (index < this.positionArr.length - 2) {
        geometryPosition.push(this.positionArrTranslate[0]);
        geometryPosition.push(this.positionArrTranslate[index + 1]);
        geometryPosition.push(this.positionArrTranslate[index + 2]);
      }
    });
    // 四周面
    this.positionArr.forEach((item, index) => {
      if (index !== this.positionArr.length - 1) {
        geometryPosition.push(this.positionArr[index]);
        geometryPosition.push(this.positionArrTranslate[index + 1]);
        geometryPosition.push(this.positionArrTranslate[index]);
        geometryPosition.push(this.positionArr[index]);
        geometryPosition.push(this.positionArr[index + 1]);
        geometryPosition.push(this.positionArrTranslate[index + 1]);
      } else {
        geometryPosition.push(this.positionArr[index]);
        geometryPosition.push(this.positionArrTranslate[0]);
        geometryPosition.push(this.positionArrTranslate[index]);
        geometryPosition.push(this.positionArr[index]);
        geometryPosition.push(this.positionArr[0]);
        geometryPosition.push(this.positionArrTranslate[0]);
      }
    });
    geometry.setFromPoints(geometryPosition);
    console.log(geometry);
    this.geometry = geometry;
  }
  // 设置孔洞
  setHole(positionArr: Vector2[]) {
    const holePath = new Path();
    positionArr.forEach((item, index) => {
      if (index === 0) {
        holePath.moveTo(item.x, item.y);
      } else {
        holePath.lineTo(item.x, item.y);
      }
    });
    holePath.lineTo(positionArr[0].x, positionArr[0].y);
    this.shape.holes.push(holePath);
  }
}
export { PolygonGeometry };
