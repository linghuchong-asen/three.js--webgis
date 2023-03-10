/*
 * @Description: Scene模块
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-09 10:33:07
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-06 14:35:38
 */
import { Scene as ThreeScene } from 'three';
import { PerspectiveCamera } from './Camera';
import { PrimitiveGroup } from '../primitive/PrimitiveGroup';
import { DirectionalLight } from '../lights/DirectionalLight';
import { primitiveArr } from '@/primitive/PrimitiveGroup';

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const light = new DirectionalLight(0xffffff, 5);

class Scene extends ThreeScene {
  constructor() {
    super();
  }
  camera = camera;

  light = light;

  primitives = new PrimitiveGroup();

  getPrimitiveById(id: string) {
    const primitive = primitiveArr.find((item: any) => item.id === id);
    return primitive;
  }
}
export { Scene, camera };
