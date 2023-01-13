/*
 * @Description:LineSymbol模块
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-11 14:27:47
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-22 09:25:48
 */

import { Color } from 'three/src/math/Color.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Mesh } from 'three/src/objects/Mesh.js';
// import { chunkArray } from './../../utils/utilFunction';
import { Vector3 } from '../math/Vector3';
import { CatmullRomCurve3 } from '../annex/CatmullRomCurve3';

interface chunkArrayParam {
  arr: any[];
  num: number;
}
const chunkArray = (params: chunkArrayParam) => {
  let newArr: any[] = [];
  params.arr.map((item, index) => {
    const newArrIndex = index % params.num;
    if (newArrIndex === 0) {
      newArr.push([]);
    }
    newArr[newArr.length - 1].push(item);
  });
  return newArr;
};

/* for (let i = -50; i < 50; i++) {
  // 因为虚线是一段一段的所以一定要知道画轨迹的几何方程，这里是正比例函数很简单；但想画出比较难的东西的时候几何方程怎么求可能都是个问题
  points.push(new THREE.Vector3(i, i, 0));
} */

interface LineDottedParams {
  x1?: number;
  y1?: number;
  z1?: number;
  x2?: number;
  y2?: number;
  z2?: number;
  lineDottedWidth?: number;
  lineDottedColor?: number;
}

class LineDottedSymbol extends Mesh {
  isLine: boolean;
  type: string;
  geometry: LineSegmentsGeometry;
  material: LineMaterial;
  x1?: number;
  y1?: number;
  z1?: number;
  x2?: number;
  y2?: number;
  z2?: number;
  color?: number;
  width?: number;

  constructor(params: LineDottedParams) {
    super();
    this.isLine = true;
    this.type = 'Line';

    if (params === undefined) {
      const points: number[] = [];
      for (let i = -50; i < 50; i++) {
        // 因为虚线是一段一段的所以一定要知道画轨迹的几何方程，这里是正比例函数很简单；但想画出比较难的东西的时候几何方程怎么求可能都是个问题
        points.push(i, i, 0);
      }
      const points3 = chunkArray({ arr: points, num: 3 }).map((item) => new Vector3(item[0], item[1], item[2]));
      // 用CatmullRomCurve3生成一条平滑的弧线
      const spline = new CatmullRomCurve3(points3);
      const divisions = 3 * points3.length;
      const point: Vector3 = new Vector3();
      const positions: number[] = [];
      for (let i = 0; i < divisions; i++) {
        const t = i / divisions;
        spline.getPoint(t, point);
        positions.push(point.x, point.y, point.z);
      }
      this.geometry = new LineSegmentsGeometry().setPositions(positions);
      this.material = new LineMaterial({ color: 0x6c5ce7, linewidth: 1 });
    } else {
      this.x1 = params.x1 === undefined ? -50 : params.x1;
      this.y1 = params.y1 === undefined ? -50 : params.y1;
      this.z1 = params.z1 === undefined ? -50 : params.z1;
      this.x2 = params.x2 === undefined ? 50 : params.x2;
      this.y2 = params.y2 === undefined ? 50 : params.y2;
      this.z2 = params.z2 === undefined ? 50 : params.z2;
      this.color = params.lineDottedColor === undefined ? 0x6c5ce7 : params.lineDottedColor;
      this.width = params.lineDottedWidth === undefined ? 1 : params.lineDottedWidth;

      const points: number[] = [];
      for (let i = this.x1; i < this.x2; i++) {
        // 因为虚线是一段一段的所以一定要知道画轨迹的几何方程，这里是正比例函数很简单；但想画出比较难的东西的时候几何方程怎么求可能都是个问题
        points.push(i, i, i);
      }
      const points3 = chunkArray({ arr: points, num: 3 }).map((item) => new Vector3(item[0], item[1], item[2]));

      // 用CatmullRomCurve3生成一条平滑的弧线
      const spline = new CatmullRomCurve3(points3);
      const divisions = 3 * points3.length;
      const point: Vector3 = new Vector3();
      const positions: number[] = [];
      for (let i = 0; i < divisions; i++) {
        const t = i / divisions;
        spline.getPoint(t, point);
        positions.push(point.x, point.y, point.z);
      }

      this.geometry = new LineSegmentsGeometry().setPositions(positions);
      this.material = new LineMaterial({ color: this.color, linewidth: this.width });
    }

    this.material.resolution.set(window.innerWidth, window.innerHeight);
    this.updateMorphTargets();
  }

  /**
   * @@description: 设置线的路径点
   * @param {array} array
   */
  setPoints(pointArray: number[]) {
    const points3 = chunkArray({ arr: pointArray, num: 3 }).map((item) => new Vector3(item[0], item[1], item[2]));
    // 用CatmullRomCurve3生成一条平滑的弧线
    const spline = new CatmullRomCurve3(points3);
    const divisions = 3 * points3.length;
    const point: Vector3 = new Vector3();
    const positions: number[] = [];
    for (let i = 0; i < divisions; i++) {
      const t = i / divisions;
      spline.getPoint(t, point);
      positions.push(point.x, point.y, point.z);
    }
    this.geometry.setPositions(positions);
  }
  /**
   * @@description: 设置线的颜色
   * @param {string} color
   */
  setColor(color: string) {
    this.material.color = new Color(color);
  }
  /**
   * @@description: 设置线宽
   * @param {number} width
   */
  setWidth(width: number) {
    this.material.linewidth = width;
  }
}

export { LineDottedSymbol };
