/*
 * @Description:立方体符号
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-18 10:30:24
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-22 15:52:15
 */
import { BoxGeometry } from 'three/src/geometries/BoxGeometry.js';
import { Object3D } from 'three/src/core/Object3D.js';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial.js';
import { Color } from 'three/src/math/Color.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { Sphere } from 'three/src/math/Sphere.js';
import { Matrix4 } from 'three/src/math/Matrix4.js';
import { Ray } from 'three/src/math/Ray.js';
import { Vector3 } from 'three/src/math/Vector3.js';
import { Vector2 } from 'three/src/math/Vector2.js';
import { Triangle } from 'three/src/math/Triangle.js';

const _sphere = /*@__PURE__*/ new Sphere();
const _inverseMatrix = /*@__PURE__*/ new Matrix4();
const _ray = /*@__PURE__*/ new Ray();
const _vA = /*@__PURE__*/ new Vector3();
const _vB = /*@__PURE__*/ new Vector3();
const _vC = /*@__PURE__*/ new Vector3();

const _tempA = /*@__PURE__*/ new Vector3();
const _tempB = /*@__PURE__*/ new Vector3();
const _tempC = /*@__PURE__*/ new Vector3();

const _morphA = /*@__PURE__*/ new Vector3();
const _morphB = /*@__PURE__*/ new Vector3();
const _morphC = /*@__PURE__*/ new Vector3();

const _uvA = /*@__PURE__*/ new Vector2();
const _uvB = /*@__PURE__*/ new Vector2();
const _uvC = /*@__PURE__*/ new Vector2();

const _intersectionPoint = /*@__PURE__*/ new Vector3();
const _intersectionPointWorld = /*@__PURE__*/ new Vector3();

interface BoxSymbolParams {
  width?: number;
  height?: number;
  depth?: number;
  boxColor?: number;
  boxMap?: string;
}

class BoxSymbol extends Object3D {
  type: string;
  geometry: BoxGeometry;
  material: MeshBasicMaterial;
  isBoxSymbol: boolean;
  isMesh: boolean;
  morphTargetInfluences: any;
  morphTargetDictionary: any;
  width?: number;
  height?: number;
  depth?: number;
  boxColor?: number;
  boxMap?: string;

  constructor(params: BoxSymbolParams) {
    /* geometry = new BoxGeometry(1, 1, 1), material = new MeshBasicMaterial({ color: 0xee5253 }) */
    super();
    this.type = 'Mesh';
    this.isBoxSymbol = true;
    this.isMesh = true;

    if (params === undefined) {
      this.geometry = new BoxGeometry(1, 1, 1);
      this.material = new MeshBasicMaterial({ color: 0xee5253 });
    } else {
      this.width = params.width === undefined ? 1 : params.width;
      this.height = params.height === undefined ? 1 : params.height;
      this.depth = params.depth === undefined ? 1 : params.depth;
      this.boxColor = params.boxColor;
      this.boxMap = params.boxMap;

      this.geometry = new BoxGeometry(this.width, this.height, this.depth);
      this.material = new MeshBasicMaterial();
      if (this.boxColor !== undefined) {
        this.material.map = null;
        this.material.color = new Color(this.boxColor);
      }

      if (this.boxMap !== undefined) {
        this.material.color = new Color('#ffffff');
        const texture = new TextureLoader().load(this.boxMap);
        texture.wrapS = 1000;
        texture.wrapT = 1000;
        texture.repeat.set(1, 1);
        this.material.map = texture;
        this.material.side = 2;
      }
    }

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

  raycast(raycaster: any, intersects: any) {
    const geometry = this.geometry;
    const material = this.material;
    const matrixWorld = this.matrixWorld;

    if (material === undefined) return;

    // Checking boundingSphere distance to ray

    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    if (geometry.boundingSphere) _sphere.copy(geometry.boundingSphere);
    _sphere.applyMatrix4(matrixWorld);

    if (raycaster.ray.intersectsSphere(_sphere) === false) return;

    //

    _inverseMatrix.copy(matrixWorld).invert();
    _ray.copy(raycaster.ray).applyMatrix4(_inverseMatrix);

    // Check boundingBox before continuing

    if (geometry.boundingBox !== null) {
      if (_ray.intersectsBox(geometry.boundingBox) === false) return;
    }

    let intersection: any;

    const index = geometry.index;
    const position = geometry.attributes.position;
    const morphPosition = geometry.morphAttributes.position;
    const morphTargetsRelative = geometry.morphTargetsRelative;
    const uv = geometry.attributes.uv;
    const uv2 = geometry.attributes.uv2;
    const groups = geometry.groups;
    const drawRange = geometry.drawRange;

    if (index !== null) {
      // indexed buffer geometry

      if (Array.isArray(material)) {
        for (let i = 0, il = groups.length; i < il; i++) {
          const group = groups[i];

          const groupMaterial = material[group.materialIndex as number];

          const start = Math.max(group.start, drawRange.start);
          const end = Math.min(index.count, Math.min(group.start + group.count, drawRange.start + drawRange.count));

          for (let j = start, jl = end; j < jl; j += 3) {
            const a = index.getX(j);
            const b = index.getX(j + 1);
            const c = index.getX(j + 2);

            intersection = checkBufferGeometryIntersection(
              this,
              groupMaterial,
              raycaster,
              _ray,
              position,
              morphPosition,
              morphTargetsRelative,
              uv,
              uv2,
              a,
              b,
              c,
            );

            if (intersection) {
              intersection.faceIndex = Math.floor(j / 3); // triangle number in indexed buffer semantics
              intersection.face.materialIndex = group.materialIndex;
              intersects.push(intersection);
            }
          }
        }
      } else {
        const start = Math.max(0, drawRange.start);
        const end = Math.min(index.count, drawRange.start + drawRange.count);

        for (let i = start, il = end; i < il; i += 3) {
          const a = index.getX(i);
          const b = index.getX(i + 1);
          const c = index.getX(i + 2);

          intersection = checkBufferGeometryIntersection(
            this,
            material,
            raycaster,
            _ray,
            position,
            morphPosition,
            morphTargetsRelative,
            uv,
            uv2,
            a,
            b,
            c,
          );

          if (intersection) {
            intersection.faceIndex = Math.floor(i / 3); // triangle number in indexed buffer semantics
            intersects.push(intersection);
          }
        }
      }
    } else if (position !== undefined) {
      // non-indexed buffer geometry

      if (Array.isArray(material)) {
        for (let i = 0, il = groups.length; i < il; i++) {
          const group = groups[i];
          const groupMaterial = material[group.materialIndex as number];

          const start = Math.max(group.start, drawRange.start);
          const end = Math.min(position.count, Math.min(group.start + group.count, drawRange.start + drawRange.count));

          for (let j = start, jl = end; j < jl; j += 3) {
            const a = j;
            const b = j + 1;
            const c = j + 2;

            intersection = checkBufferGeometryIntersection(
              this,
              groupMaterial,
              raycaster,
              _ray,
              position,
              morphPosition,
              morphTargetsRelative,
              uv,
              uv2,
              a,
              b,
              c,
            );

            if (intersection) {
              intersection.faceIndex = Math.floor(j / 3); // triangle number in non-indexed buffer semantics
              intersection.face.materialIndex = group.materialIndex;
              intersects.push(intersection);
            }
          }
        }
      } else {
        const start = Math.max(0, drawRange.start);
        const end = Math.min(position.count, drawRange.start + drawRange.count);

        for (let i = start, il = end; i < il; i += 3) {
          const a = i;
          const b = i + 1;
          const c = i + 2;

          intersection = checkBufferGeometryIntersection(
            this,
            material,
            raycaster,
            _ray,
            position,
            morphPosition,
            morphTargetsRelative,
            uv,
            uv2,
            a,
            b,
            c,
          );

          if (intersection) {
            intersection.faceIndex = Math.floor(i / 3); // triangle number in non-indexed buffer semantics
            intersects.push(intersection);
          }
        }
      }
    }
  }
}

function checkBufferGeometryIntersection(
  object: any,
  material: any,
  raycaster: any,
  ray: any,
  position: any,
  morphPosition: any,
  morphTargetsRelative: any,
  uv: any,
  uv2: any,
  a: any,
  b: any,
  c: any,
) {
  _vA.fromBufferAttribute(position, a);
  _vB.fromBufferAttribute(position, b);
  _vC.fromBufferAttribute(position, c);

  const morphInfluences = object.morphTargetInfluences;

  if (morphPosition && morphInfluences) {
    _morphA.set(0, 0, 0);
    _morphB.set(0, 0, 0);
    _morphC.set(0, 0, 0);

    for (let i = 0, il = morphPosition.length; i < il; i++) {
      const influence = morphInfluences[i];
      const morphAttribute = morphPosition[i];

      if (influence === 0) continue;

      _tempA.fromBufferAttribute(morphAttribute, a);
      _tempB.fromBufferAttribute(morphAttribute, b);
      _tempC.fromBufferAttribute(morphAttribute, c);

      if (morphTargetsRelative) {
        _morphA.addScaledVector(_tempA, influence);
        _morphB.addScaledVector(_tempB, influence);
        _morphC.addScaledVector(_tempC, influence);
      } else {
        _morphA.addScaledVector(_tempA.sub(_vA), influence);
        _morphB.addScaledVector(_tempB.sub(_vB), influence);
        _morphC.addScaledVector(_tempC.sub(_vC), influence);
      }
    }

    _vA.add(_morphA);
    _vB.add(_morphB);
    _vC.add(_morphC);
  }

  if (object.isSkinnedMesh) {
    object.boneTransform(a, _vA);
    object.boneTransform(b, _vB);
    object.boneTransform(c, _vC);
  }

  const intersection: any = checkIntersection(object, material, raycaster, ray, _vA, _vB, _vC, _intersectionPoint);

  if (intersection) {
    if (uv) {
      _uvA.fromBufferAttribute(uv, a);
      _uvB.fromBufferAttribute(uv, b);
      _uvC.fromBufferAttribute(uv, c);

      intersection.uv = Triangle.getUV(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vector2());
    }

    if (uv2) {
      _uvA.fromBufferAttribute(uv2, a);
      _uvB.fromBufferAttribute(uv2, b);
      _uvC.fromBufferAttribute(uv2, c);

      intersection.uv2 = Triangle.getUV(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vector2());
    }

    const face = {
      a: a,
      b: b,
      c: c,
      normal: new Vector3(),
      materialIndex: 0,
    };

    Triangle.getNormal(_vA, _vB, _vC, face.normal);

    intersection.face = face;
  }

  return intersection;
}

function checkIntersection(
  object: any,
  material: any,
  raycaster: any,
  ray: any,
  pA: any,
  pB: any,
  pC: any,
  point: any,
) {
  let intersect;

  if (material.side === 1) {
    intersect = ray.intersectTriangle(pC, pB, pA, true, point);
  } else {
    intersect = ray.intersectTriangle(pA, pB, pC, material.side !== 2, point);
  }

  if (intersect === null) return null;

  _intersectionPointWorld.copy(point);
  _intersectionPointWorld.applyMatrix4(object.matrixWorld);

  const distance = raycaster.ray.origin.distanceTo(_intersectionPointWorld);

  if (distance < raycaster.near || distance > raycaster.far) return null;

  return {
    distance: distance,
    point: _intersectionPointWorld.clone(),
    object: object,
  };
}

export { BoxSymbol };
