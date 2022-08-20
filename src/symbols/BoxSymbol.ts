/*
 * @Description:立方体符号
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-18 10:30:24
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-19 15:48:40
 */
import { BoxGeometry } from 'three/src/geometries/BoxGeometry.js';
import { Object3D } from 'three/src/core/Object3D.js';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial.js';
import { Color } from 'three/src/math/Color.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

class BoxSymbol extends Object3D {
  type: string;
  geometry: BoxGeometry;
  material: MeshBasicMaterial;
  isMesh: true;
  morphTargetInfluences: any;
  morphTargetDictionary: any;

  constructor(geometry = new BoxGeometry(1, 1, 1), material = new MeshBasicMaterial({ color: 0xee5253 })) {
    super();
    this.type = 'Mesh';
    // this.isBoxSymbol = true;
    this.isMesh = true;
    this.geometry = geometry;
    this.material = material;

    this.updateMorphTargets();
  }
  updateMorphTargets() {
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
   * @@description: 设置颜色
   * @param {string} color
   */
  setColor(color: string) {
    this.material.color = new Color(color);
  }
  /**
   * @@description: 设置X轴方向宽度
   * @param {number} width
   */
  setWidth(width: number) {
    this.geometry.parameters.width = width;
  }
  /**
   * @@description: 设置Y轴方向高度
   * @param {number} height
   */
  setHeight(height: number) {
    this.geometry.parameters.height = height;
  }
  /**
   * @@description: 设置Z轴方向深度
   * @param {number} depth
   */
  setDepth(depth: number) {
    this.geometry.parameters.depth = depth;
  }
  setTexture(texturePath: string) {
    const texture = new TextureLoader().load(texturePath);
    this.material.map = texture;
  }
}

export { BoxSymbol };
