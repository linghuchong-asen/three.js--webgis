/*
 * @Description: 多边形
 * @Author: yangsen
 * @Date: 2023-01-29 21:10:03
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-31 13:48:45
 */
import { Shape, ShapeGeometry, ExtrudeBufferGeometry, Path } from 'three';
import { chunkArray } from '@/utils/utilFunction';

/* TODO:1.平面的多边形；2.使用拉伸方法实现拉伸；3.使用高度属性设置高度; 4.使用孔洞方法实现挖洞；5.是否带有边框线 */
class PolygonGeometry {
  positionArr: number[];
  geometry: ShapeGeometry;
  height: number;

  constructor(positionArr: number[]) {
    this.positionArr = positionArr;
    this.createShape();
    this.geometry = this.createGeometry();
    this.height = 0;
  }
  private shape = new Shape();

  private createShape() {
    const length = this.positionArr.length;
    const isEven = length % 2 === 0 ? true : false;
    if (!isEven) {
      throw new Error('PolygonGeometry位置参数数量必须是偶数');
    }
    const doubleArr = chunkArray({ arr: this.positionArr, num: 2 });
    doubleArr.forEach((item, index) => {
      if (index === 0) {
        this.shape.moveTo(item[0], item[1]);
      } else {
        this.shape.lineTo(item[0], item[1]);
      }
    });
    this.shape.lineTo(doubleArr[0][0], doubleArr[0][1]);
  }
  private createGeometry() {
    const geometry = new ShapeGeometry(this.shape);
    return geometry;
  }
  stretch(thickness: number) {
    const geometry = new ExtrudeBufferGeometry(this.shape, { depth: thickness });
    this.geometry = geometry;
  }
  setHole(positionArr: number[]) {
    const holePath = new Path();
    const length = this.positionArr.length;
    const isEven = length % 2 === 0 ? true : false;
    if (!isEven) {
      throw new Error('PolygonGeometry位置参数数量必须是偶数');
    }
    const doubleArr = chunkArray({ arr: this.positionArr, num: 2 });
    doubleArr.forEach((item, index) => {
      if (index === 0) {
        holePath.moveTo(item[0], item[1]);
      } else {
        holePath.lineTo(item[0], item[1]);
      }
    });
    holePath.lineTo(doubleArr[0][0], doubleArr[0][1]);
    this.shape.holes.push(holePath);
  }
}
export { PolygonGeometry };
