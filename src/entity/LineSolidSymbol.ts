/*
 * @Description:LineSymbol模块
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-11 14:27:47
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-22 08:40:11
 */

import { Color } from 'three/src/math/Color.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';

interface LineSymbolParams {
  x1?: number;
  y1?: number;
  z1?: number;
  x2?: number;
  y2?: number;
  z2?: number;
  lineWidth?: number;
  lineColor?: number;
}

class LineSymbol extends LineSegments2 {
  isLine: boolean;
  type: string;
  geometry: LineGeometry;
  material: LineMaterial;
  x1?: number;
  y1?: number;
  z1?: number;
  x2?: number;
  y2?: number;
  z2?: number;
  color?: number;
  width?: number;

  constructor(params: LineSymbolParams) {
    // geometry = new LineGeometry(), material = new LineMaterial({ color: 0x6c5ce7 })
    super();
    this.isLine = true;
    this.type = 'Line';

    if (params === undefined) {
      this.geometry = new LineGeometry().setPositions([0, 0, 0, 5, 5, 5]);
      this.material = new LineMaterial({ color: 0x6c5ce7, linewidth: 1 });
    } else {
      this.x1 = params.x1 === undefined ? 0 : params.x1;
      this.y1 = params.y1 === undefined ? 0 : params.y1;
      this.z1 = params.z1 === undefined ? 0 : params.z1;
      this.x2 = params.x2 === undefined ? 0 : params.x2;
      this.y2 = params.y2 === undefined ? 0 : params.y2;
      this.z2 = params.z2 === undefined ? 0 : params.z2;
      this.color = params.lineColor === undefined ? 0x6c5ce7 : params.lineColor;
      this.width = params.lineWidth === undefined ? 1 : params.lineWidth;

      this.geometry = new LineGeometry().setPositions([this.x1, this.y1, this.z1, this.x2, this.y2, this.z2]);
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
