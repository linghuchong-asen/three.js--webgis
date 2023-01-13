/*
 * @Description: 图元组
 * @Author: yangsen
 * @Date: 2023-01-05 18:21:33
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-12 21:05:30
 */
import { Object3D } from 'three';
import { GLTFLoader } from '../loader/GLTFLoader';
class PrimitiveGroup extends Object3D {
  type: string;
  constructor() {
    super();
    this.type = 'Group';
  }

  append(obj: any, children = this.children) {
    if (obj.type === 'model') {
      const loader = new GLTFLoader();
      loader.load(
        obj.url,
        // 加载成功
        function (gltf) {
          if (obj.name !== '') {
            gltf.scene.name = obj.name;
          }
          obj.isModelReady = true;
          gltf.scene.position.set(obj.position.x, obj.position.y, obj.position.z);
          children.push(gltf.scene);
        },
        // 模型加载中
        function () {},
        // 加载出错
        function (error) {
          console.error(error);
        },
      );
    }
  }
}
export { PrimitiveGroup };
