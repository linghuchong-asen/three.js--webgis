/*
 * @Description: 多边形
 * @Author: yangsen
 * @Date: 2023-01-29 21:10:03
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-06 21:14:51
 */
import { Shape, ShapeGeometry, ExtrudeBufferGeometry, Path, Vector2 } from 'three';

/* TODO:1.平面的多边形；2.使用拉伸方法实现拉伸；3.使用高度属性设置高度; 4.使用孔洞方法实现挖洞；5.是否带有边框线 */
class PolygonGeometry {
  positionArr: Vector2[];
  geometry: ShapeGeometry;
  height: number;
  outline: any;
  wall: any;

  constructor(positionArr: Vector2[]) {
    this.positionArr = positionArr;
    this.createShape();
    this.geometry = this.createGeometry();
    this.height = 0;
  }
  type = 'polygonGeometry';
  private shape = new Shape();

  private createShape() {
    this.positionArr.forEach((item, index) => {
      if (index === 0) {
        this.shape.moveTo(item.x, item.y);
      } else {
        this.shape.lineTo(item.x, item.y);
      }
    });
    this.shape.lineTo(this.positionArr[0].x, this.positionArr[0].y);
  }
  private createGeometry() {
    const geometry = new ShapeGeometry(this.shape);
    return geometry;
  }
  // 设置高度
  stretch(height: number) {
    const geometry = new ExtrudeBufferGeometry(this.shape, { depth: height });
    this.geometry = geometry;
    this.height = height;
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
