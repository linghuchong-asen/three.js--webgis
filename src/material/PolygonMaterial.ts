/*
 * @Description:防区材质
 * @Author: yangsen
 * @Date: 2023-02-06 06:47:02
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-28 08:24:46
 */
import { ShaderMaterial, DoubleSide, MeshBasicMaterial, Plane } from 'three';
import { translateColor } from '@/utils/utilFunction';
import { Color } from '@/math/Color';
import { PolylineMaterial } from './PolylineMaterial';
import { LabelMaterial } from './LabelMaterial';

class PolygonMaterial {
  material: any;
  constructor(color: Color, thickness: number = 0) {
    if (thickness === 0) {
      this.material = this.createMaterial(color);
    } else {
      this.material = this.createOpacityHeightMat(color, thickness);
    }
  }
  // 底面
  bottomPlane = new Plane();

  /* 创建具有高度透明度渐变材质 */
  private createOpacityHeightMat(
    color: Color,
    thickness: number,
    option = {
      opacity: color.alpha === 1 ? 0.5 : color.alpha,
    },
  ) {
    // 顶点着色器
    /* position uv应该是three.js内部做的工作,也就是顶点位置，纹理坐标不需要使用者再去计算和定义了,three.js已经定义好了,可以直接拿来用
  包括projectionMatrix viewMatrix modelMatrix三个矩阵也是three.js内部帮忙做的工作,直接拿来用就行 */
    const vertexShader = /* glsl */ `
       varying vec3 vPosition;
       void main() {
           vPosition = position;
           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
       }
    `;
    // 片元着色器
    const fragmentShader = /* glsl */ `
       uniform vec3 u_color;
       uniform float u_opacity;
       void main() {
           gl_FragColor = vec4(u_color, u_opacity);
       }
     `;

    const material = new ShaderMaterial({
      uniforms: {
        u_height: {
          value: thickness,
        },
        u_opacity: {
          value: option.opacity,
        },
        u_color: {
          value: translateColor(color),
        },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      side: DoubleSide,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    return material;
  }
  /* 创建普通材质 */
  private createMaterial(color: Color) {
    const material = new MeshBasicMaterial({
      color: translateColor(color),
      transparent: true,
      side: DoubleSide,
    });
    if (color.alpha !== 1) material.opacity = color.alpha;
    return material;
  }
  outlineMaterial = new PolylineMaterial();
  textMaterial = new LabelMaterial();
}

export { PolygonMaterial };
