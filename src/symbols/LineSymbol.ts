/*
 * @Description:LineSymbol模块
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-11 14:27:47
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-12 11:54:31
 */

import { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial.js';
import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { Color } from 'three/src/math/Color.js';
import { Vector3 } from 'three/src/math/Vector3.js';
import { LineDashedMaterial } from 'three/src/materials/LineDashedMaterial.js';

class LineSymbol {
  isLine: boolean;
  type: string;
  geometry: BufferGeometry;
  material: LineBasicMaterial;
  morphTargetInfluences: number[] | undefined;
  morphTargetDictionary: any;

  constructor(geometry = new BufferGeometry(), material = new LineBasicMaterial()) {
    this.isLine = true;

    this.type = 'Line';

    this.geometry = geometry;
    this.material = material;

    this.updateMorphTargets();
  }
  private updateMorphTargets() {
    const geometry = this.geometry;

    const morphAttributes = geometry.morphAttributes;
    const keys = Object.keys(morphAttributes);

    if (keys.length > 0) {
      const morphAttribute = morphAttributes[keys[0]];

      if (morphAttribute !== undefined) {
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};

        for (let m = 0, ml = morphAttribute.length; m < ml; m++) {
          const name = morphAttribute[m].name || String(m);

          this.morphTargetInfluences.push(0);
          this.morphTargetDictionary[name] = m;
        }
      }
    }
  }

  /**
   * @@description: 设置线的路径点
   * @param {array} array
   */
  setPoints(array: [number, number, number][]) {
    const vector3Array = array.map((item) => new Vector3(...item));
    this.geometry.setFromPoints(vector3Array);
  }
  /**
   * @@description: 设置线的颜色
   * @param {string} color
   */
  setColor(color: string) {
    this.material.color = new Color(color);
  }
  /**
   * @@description: 设置实线或者虚线
   * @param {string} type
   */
  setType(type: string) {
    switch (type) {
      case 'solid':
        this.material = this.material;
        break;
      case 'dotted':
        this.material = new LineDashedMaterial();
    }
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
