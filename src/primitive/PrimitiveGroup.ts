/*
 * @Description: 图元组
 * @Author: yangsen
 * @Date: 2023-01-05 18:21:33
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-31 11:06:36
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
    // children是继承自Object3D属性
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
          // gis场景Z轴朝上，所以改变了camera的up属性；但是gltf格式还是Y轴向上，要经过旋转适配。
          gltf.scene.rotateX(-Math.PI / 2);
          gltf.scene.rotateZ(-Math.PI);
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
    } else {
      children.push(obj);
    }
  }
}
export { PrimitiveGroup };
