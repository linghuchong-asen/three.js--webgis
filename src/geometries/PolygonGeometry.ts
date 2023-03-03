/*
 * @Description: 多边形
 * @Author: yangsen
 * @Date: 2023-01-29 21:10:03
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-03 13:53:52
 */
import {
  Shape,
  ShapeGeometry,
  ExtrudeBufferGeometry,
  Path,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Clock,
  Vector2,
} from 'three';
import { chunkArray } from '@/utils/utilFunction';
// import { heightCB } from '@/material/PolygonMaterial';

/* TODO:1.平面的多边形；2.使用拉伸方法实现拉伸；3.使用高度属性设置高度; 4.使用孔洞方法实现挖洞；5.是否带有边框线 */
class PolygonGeometry {
  positionArr: Vector2[];
  geometry: ShapeGeometry;
  height: number;
  hasEdge: boolean;
  outline: any;
  wall: any;

  constructor(positionArr: Vector2[]) {
    this.positionArr = positionArr;
    this.createShape();
    this.geometry = this.createGeometry();
    this.height = 0;
    this.hasEdge = true;
    this.outline = this.createEdge();
  }
  type = 'polygonGeometry';
  private shape = new Shape();
  clock = new Clock();

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
  stretch(thickness: number) {
    const geometry = new ExtrudeBufferGeometry(this.shape, { depth: thickness });
    this.geometry = geometry;
    // heightCB(thickness);
  }
  // 设置孔洞
  setHole(positionArr: number[]) {
    const holePath = new Path();
    const length = this.positionArr.length;
    const isEven = length % 2 === 0 ? true : false;
    if (!isEven) {
      throw new Error('PolygonGeometry位置参数数量必须是偶数');
    }
    const doubleArr = chunkArray({ arr: positionArr, num: 2 });
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
  private createEdge = (color?: any) => {
    if (this.hasEdge) {
      const edgeGeometry = new EdgesGeometry(this.geometry);
      const edgeMaterial = new LineBasicMaterial({
        color: color === undefined ? 0x3742fa : color,
        linewidth: 10,
      });
      const edge = new LineSegments(edgeGeometry, edgeMaterial);
      return edge;
    } else {
      return null;
    }
  };
  // 设置边框线颜色
  setOutlineColor(color: any) {
    this.outline = this.createEdge(color);
  }
}
export { PolygonGeometry };
