/*
 * @Description: Scene模块
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-09 10:33:07
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-12 18:04:25
 */
import { Scene as ThreeScene } from 'three';
import { PerspectiveCamera } from './Camera';
import { PrimitiveGroup } from '../primitive/PrimitiveGroup';
import { DirectionalLight } from '../lights/DirectionalLight';

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const light = new DirectionalLight(0xffffff, 5);

class Scene extends ThreeScene {
  constructor() {
    super();
  }
  camera = camera;

  light = light;

  primitives = new PrimitiveGroup();
}
export { Scene, camera };
