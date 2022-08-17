/*
 * @Description:点符号文件
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-11 14:27:31
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-17 14:12:32
 */

import { PointsMaterial } from 'three/src/materials/PointsMaterial.js';
import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { Object3D } from 'three/src/core/Object3D.js';
import { Float32BufferAttribute } from 'three/src/core/BufferAttribute.js';
import { CanvasTexture } from 'three/src/textures/CanvasTexture.js';

const canvasTextureCircle = (color?: string) => {
  const canvas = document.createElement('canvas');
  // 不设置canvas的宽高的话，在three.js中会形成椭圆
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  if (ctx !== null) {
    ctx.fillStyle = color === undefined ? '#ff0000' : color;
    ctx.arc(50, 50, 50, 0, 2 * Math.PI);
    ctx.fill();
  }
  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

class PointSymbol extends Object3D {
  type: string;
  geometry: BufferGeometry;
  material: PointsMaterial;
  morphTargetInfluences: number[] | undefined;
  morphTargetDictionary: any;
  isPoints: boolean;
  // scale: Vector3;

  constructor(
    geometry = new BufferGeometry().setAttribute('position', new Float32BufferAttribute([0, 0, 0], 3)),
    material = new PointsMaterial({ map: canvasTextureCircle(), transparent: true }),
  ) {
    super();
    this.type = 'Points';
    this.isPoints = true;
    this.geometry = geometry;
    this.material = material;
    // this.scale = new Vector3(1, 1, 1);

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
  /**
   * @@description: 设置颜色
   * @param {string} color
   */
  setColor(color: string) {
    this.material.map = canvasTextureCircle(color);
  }
  /**
   * @@description: 设置大小
   * @param {number} size
   */
  setSize(size: number) {
    this.material.size = size;
  }
  /**
   * @@description: 获取点大小
   */
  getSize() {
    return this.material.size;
  }
  /**
   * @@description: three.js中点是不支持缩放的，而且点缩放没有意义；这里的缩放还是用的PointsMaterial上的size属性
   * @param {number} scale
   */
  setScale(scale: number) {
    this.material.size = this.material.size * scale;
  }
  /**
   * @@description: 设置透明度
   * @param {number} opacity
   */
  setOpacity(opacity: number) {
    this.material.opacity = opacity;
  }
}

export { PointSymbol };
