/*
 * @Description: Scene模块
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-09 10:33:07
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-06 18:39:02
 */
import { Scene as ThreeScene } from 'three';
import { PerspectiveCamera } from './Camera';
import { Viewer } from './Viewer';

class Scene extends ThreeScene {
  constructor() {
    super();
  }
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
}
export { Scene };
