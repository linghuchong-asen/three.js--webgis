/*
 * @Description:防区材质
 * @Author: yangsen
 * @Date: 2023-02-06 06:47:02
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-03 14:58:28
 */
import { ShaderMaterial, DoubleSide, MeshBasicMaterial } from 'three';
import { translateColor } from '@/utils/utilFunction';
import { Color } from '@/math/Color';

/* let heightState: number;
interface Obj {
  height: undefined | number;
}
const obj: Obj = {
  height: undefined,
};
const handler = {
  get: function (target: any, key: string, receiver: any) {
    return Reflect.get(target, key, receiver);
  },
  set: function (target: any, key: string, value: any, receiver: any) {
    if (key === 'height') {
      heightState = value;
    }
    return true;
  },
};
const objProxy = new Proxy(obj, handler); */

class PolygonMaterial {
  material: any;
  constructor(color: Color, height?: number) {
    if (height === undefined) {
      this.material = this.createMaterial(color);
    } else {
      this.material = this.createOpacityHeightMat(color, height);
    }
  }

  /* 创建具有高度透明度渐变材质 */
  createOpacityHeightMat(
    color: Color,
    height: number,
    option = {
      opacity: color.alpha === 1 ? 0.5 : color.alpha,
    },
  ) {
    // 顶点着色器
    /* position uv应该是three.js内部做的工作,也就是顶点位置，纹理坐标不需要使用者再去计算和定义了,three.js已经定义好了,可以直接拿来用
  包括projectionMatrix viewMatrix modelMatrix三个矩阵也是three.js内部帮忙做的工作,直接拿来用就行 */
    const vertexShader = /* glsl */ `
       uniform vec3 u_color;
       uniform float u_height;
       varying float v_opacity;
       void main() {
           vec3 vPosition = position; //position是一个vec3，没有w分量
           v_opacity = mix(0.0, 1.0, position.z / u_height * 1.0) ;
           gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1);
       }
    `;
    // 片元着色器
    const fragmentShader = /* glsl */ `
       uniform vec3 u_color;
       uniform float u_opacity;
       varying float v_opacity;
       void main() {
           gl_FragColor = vec4(u_color, v_opacity * u_opacity);
       }
     `;

    const material = new ShaderMaterial({
      uniforms: {
        u_height: {
          value: height,
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
  createMaterial(color: Color) {
    const material = new MeshBasicMaterial({ color: translateColor(color), transparent: true });
    if (color.alpha !== 1) material.opacity = color.alpha;
    return material;
  }
}
/* export const heightCB = (height: number): void => {
  objProxy.height = height;
}; */
export { PolygonMaterial };
