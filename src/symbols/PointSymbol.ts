/*
 * @Description:点符号文件
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-11 14:27:31
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-12 20:27:04
 */

import { PointsMaterial } from 'three/src/materials/PointsMaterial.js';
import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { Color } from 'three/src/math/Color.js';
import { Vector3 } from 'three/src/math/Vector3.js';

class PointSymbol {
  type: string;
  geometry: BufferGeometry;
  material: PointsMaterial;
  morphTargetInfluences: number[] | undefined;
  morphTargetDictionary: any;
  isPoints: boolean;
  scale: Vector3;
  position: Vector3;

  constructor(geometry = new BufferGeometry(), material = new PointsMaterial()) {
    this.type = 'Points';
    this.isPoints = true;
    this.geometry = geometry;
    this.material = material;
    this.scale = new Vector3(1, 1, 1);
    this.position = new Vector3(0, 0, 0);

    this.updateMorphTargets();
  }
  /* updateMorphTargets这个函数的功能是什么 */
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
  setColor(color: string) {
    this.material.color = new Color(color);
  }
  setScale(x: number, y: number, z: number) {
    this.geometry.scale(x, y, z);
  }
}

export { PointSymbol };
