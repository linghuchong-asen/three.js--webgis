/*
 * @Description:LineSymbol模块
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-11 14:27:47
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-19 10:26:21
 */

import { Color } from 'three/src/math/Color.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';

class LineSymbol extends LineSegments2 {
  isLine: boolean;
  type: string;
  geometry: LineGeometry;
  material: LineMaterial;

  constructor(geometry = new LineGeometry(), material = new LineMaterial({ color: 0x6c5ce7 })) {
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
    this.geometry.setPositions(pointArray);
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

export { LineSymbol };
