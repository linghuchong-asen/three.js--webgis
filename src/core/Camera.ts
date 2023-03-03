/*
 * @Description: Camera模块
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-09 10:34:15
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-03 10:19:28
 */
import { PerspectiveCamera } from 'three';
import { OrthographicCamera } from 'three';
// import { controls } from '@/core/Viewer';

class Camera extends PerspectiveCamera {
  constructor() {
    super();
  }
  readonly heading = this.rotation.z;
  readonly pitch = this.rotation.x;
  readonly roll = this.rotation.y;
  /* _heading = 0; // 偏航角，绕Z轴
  _pitch = 0; // 俯仰角，绕X轴
  _roll = 0; // 翻滚角，绕Y轴 
 set heading(value: number) {
    this.rotateZ(value);
  }
  get heading() {
    this._heading = this.rotation.z;
    return this._heading;
  }
  set pitch(value: number) {
    this.rotateX(value);
  }
  get pitch() {
    this._pitch = this.rotation.x;
    return this._pitch;
  }
  set roll(value: number) {
    this.rotateY(value);
  }
  get roll() {
    this._roll = this.rotation.y;
    return this._roll;
  }  */
}
export { Camera, PerspectiveCamera, OrthographicCamera };
