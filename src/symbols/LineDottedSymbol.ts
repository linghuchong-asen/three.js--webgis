/*
 * @Description:LineSymbol模块
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-11 14:27:47
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-19 10:53:16
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
  let newArr!: any[];
  params.arr.map((item, index) => {
    const newArrIndex = index % params.num;
    if (newArrIndex === 0) {
      newArr.push([]);
    }
    newArr[newArr.length - 1].push(item);
  });
  return newArr;
};

class LineDottedSymbol extends Mesh {
  isLine: boolean;
  type: string;
  geometry: LineSegmentsGeometry;
  material: LineMaterial;

  constructor(geometry = new LineSegmentsGeometry(), material = new LineMaterial({ color: 0x6c5ce7 })) {
    super();
    this.isLine = true;

    this.type = 'Line';

    this.geometry = geometry;
    this.material = material;
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
