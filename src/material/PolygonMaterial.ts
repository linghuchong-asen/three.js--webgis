/*
 * @Description:防区材质
 * @Author: yangsen
 * @Date: 2023-02-06 06:47:02
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-07 16:27:13
 */
import { ShaderMaterial, Color, DoubleSide } from 'three';

class PolygonMaterial {
  material: any;
  constructor(color: any) {
    this.material = this.createOpacityWallMat(color);
  }
  /**
   * 创建透明墙体材质
   * option =>
   * params height color opacity speed
   * **/
  createOpacityWallMat = (
    color: any,
    option = {
      height: 3,
      opacity: 0.5,
      speed: 1,
    },
  ) => {
    // 顶点着色器
    /* position uv应该是three.js内部做的工作,也就是顶点位置，纹理坐标不需要使用者再去计算和定义了,three.js已经定义好了,可以直接拿来用
  包括projectionMatrix viewMatrix modelMatrix三个矩阵也是three.js内部帮忙做的工作,直接拿来用就行 */
    const vertexShader = /* glsl */ `
       uniform vec3 u_color;

       uniform float time;
       uniform float u_height;
       varying float v_opacity;

       void main() {
           vec3 vPosition = position;
           v_opacity = mix(0.0, 0.3, position.z / u_height * 1.0) * (1.0 + sin(time) * 0.5);
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

    return new ShaderMaterial({
      uniforms: {
        u_height: {
          value: option.height,
        },
        u_opacity: {
          value: option.opacity,
        },
        u_color: {
          value: new Color(color),
        },
        time: {
          value: 0,
        },
        speed: {
          value: option.speed,
        },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      side: DoubleSide,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  };
}
export { PolygonMaterial };
