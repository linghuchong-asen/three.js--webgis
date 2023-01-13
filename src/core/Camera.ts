/*
 * @Description: Camera模块
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-09 10:34:15
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-05 19:57:34
 */
import { PerspectiveCamera } from 'three';
import { OrthographicCamera } from 'three';

class Camera extends PerspectiveCamera {
  constructor() {
    super();
  }
}
export { Camera, PerspectiveCamera, OrthographicCamera };
