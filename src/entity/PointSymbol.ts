/*
 * @Description:点符号文件
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-11 14:27:31
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-22 08:40:23
 */

import { PointsMaterial } from 'three/src/materials/PointsMaterial.js';
import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { Object3D } from 'three/src/core/Object3D.js';
import { Float32BufferAttribute } from 'three/src/core/BufferAttribute.js';
import { CanvasTexture } from 'three/src/textures/CanvasTexture.js';
import { Sphere } from 'three/src/math/Sphere.js';
import { Matrix4 } from 'three/src/math/Matrix4.js';
import { Ray } from 'three/src/math/Ray.js';
import { Vector3 } from 'three/src/math/Vector3.js';

const canvasTextureCircle = (color: string) => {
  const canvas = document.createElement('canvas');
  // 不设置canvas的宽高的话，在three.js中会形成椭圆
  canvas.width = 10;
  canvas.height = 10;
  const ctx = canvas.getContext('2d');
  if (ctx !== null) {
    ctx.fillStyle = color;
    ctx.arc(5, 5, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};
const _sphere = /*@__PURE__*/ new Sphere();
const _inverseMatrix = /*@__PURE__*/ new Matrix4();
const _ray = /*@__PURE__*/ new Ray();
const _position = /*@__PURE__*/ new Vector3();

interface params {
  x?: number;
  y?: number;
  z?: number;
  color?: string;
  size?: number;
  opacity?: number;
}
class PointSymbol extends Object3D {
  type: string;
  geometry: BufferGeometry;
  material: PointsMaterial;
  morphTargetInfluences: number[] | undefined;
  morphTargetDictionary: any;
  isPoints: boolean;
  x?: number;
  y?: number;
  z?: number;
  color?: string;
  size?: number;
  opacity?: number;

  // scale: Vector3;

  constructor(params: params) {
    super();
    this.type = 'Points';
    this.isPoints = true;
    if (params === undefined) {
      this.geometry = new BufferGeometry().setAttribute('position', new Float32BufferAttribute([0, 0, 0], 3));
      this.material = new PointsMaterial({
        map: canvasTextureCircle('#ff0000'),
        transparent: true,
      });
    } else {
      this.x = params.x === undefined ? 0 : params.x;
      this.y = params.y === undefined ? 0 : params.y;
      this.z = params.z === undefined ? 0 : params.z;
      this.color = params.color === undefined ? '#ff0000' : params.color;
      this.size = params.size === undefined ? 1 : params.size;
      this.opacity = params.opacity === undefined ? 1 : params.opacity;
      this.geometry = new BufferGeometry().setAttribute(
        'position',
        new Float32BufferAttribute([this.x, this.y, this.z], 3),
      );
      this.material = new PointsMaterial({
        map: canvasTextureCircle(this.color),
        transparent: true,
        size: this.size,
        opacity: this.opacity,
      });
    }

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

  raycast(raycaster: any, intersects: any[]) {
    const geometry = this.geometry;
    const matrixWorld = this.matrixWorld;
    const threshold = raycaster.params.Points.threshold;
    const drawRange = geometry.drawRange;

    // Checking boundingSphere distance to ray

    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

    if (geometry.boundingSphere) _sphere.copy(geometry.boundingSphere);
    _sphere.applyMatrix4(matrixWorld);
    _sphere.radius += threshold;

    if (raycaster.ray.intersectsSphere(_sphere) === false) return;

    //

    _inverseMatrix.copy(matrixWorld).invert();
    _ray.copy(raycaster.ray).applyMatrix4(_inverseMatrix);

    const localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
    const localThresholdSq = localThreshold * localThreshold;

    const index = geometry.index;
    const attributes = geometry.attributes;
    const positionAttribute = attributes.position;

    if (index !== null) {
      const start = Math.max(0, drawRange.start);
      const end = Math.min(index.count, drawRange.start + drawRange.count);

      for (let i = start, il = end; i < il; i++) {
        const a = index.getX(i);

        _position.fromBufferAttribute(positionAttribute, a);

        testPoint(_position, a, localThresholdSq, matrixWorld, raycaster, intersects, this);
      }
    } else {
      const start = Math.max(0, drawRange.start);
      const end = Math.min(positionAttribute.count, drawRange.start + drawRange.count);

      for (let i = start, l = end; i < l; i++) {
        _position.fromBufferAttribute(positionAttribute, i);

        testPoint(_position, i, localThresholdSq, matrixWorld, raycaster, intersects, this);
      }
    }
  }
}
function testPoint(
  point: any,
  index: any,
  localThresholdSq: any,
  matrixWorld: any,
  raycaster: any,
  intersects: any,
  object: any,
) {
  const rayPointDistanceSq = _ray.distanceSqToPoint(point);

  if (rayPointDistanceSq < localThresholdSq) {
    const intersectPoint = new Vector3();

    _ray.closestPointToPoint(point, intersectPoint);
    intersectPoint.applyMatrix4(matrixWorld);

    const distance = raycaster.ray.origin.distanceTo(intersectPoint);

    if (distance < raycaster.near || distance > raycaster.far) return;

    intersects.push({
      distance: distance,
      distanceToRay: Math.sqrt(rayPointDistanceSq),
      point: intersectPoint,
      index: index,
      face: null,
      object: object,
    });
  }
}

export { PointSymbol };
