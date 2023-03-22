/*
 * @Description: 几何图形实例;公共属性：平移，旋转，缩放在这个类中
 * @Author: yangsen
 * @Date: 2023-01-30 20:17:20
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-17 17:08:39
 */
import { Vector3 } from 'three';
interface Options {
  geometry: any;
  translate?: Vector3;
  rotation?: Vector3;
  scale?: Vector3;
  heading?: number;
  pitch?: number;
  roll?: number;
  matrix?: any;
}
class GeometryInstance {
  geometry: any;
  translate: Vector3;
  rotation: Vector3;
  scale: Vector3;
  heading: number; // 绕Z轴
  pitch: number; // 绕X轴
  roll: number; // 绕Y轴
  matrix: any;
  constructor(options: Options) {
    this.geometry = options.geometry;
    this.translate = options.translate === undefined ? new Vector3(0, 0, 0) : options.translate;
    this.scale = options.scale === undefined ? new Vector3(1, 1, 1) : options.scale;
    this.rotation = options.rotation === undefined ? new Vector3(0, 0, 0) : options.rotation;
    this.heading = options.heading === undefined ? 0 : options.heading;
    this.pitch = options.pitch === undefined ? 0 : options.pitch;
    this.roll = options.roll === undefined ? 0 : options.roll;
    this.matrix = options.matrix;
  }
}
export { GeometryInstance };
