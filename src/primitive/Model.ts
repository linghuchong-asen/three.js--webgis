/*
 * @Description: 加载模型文件
 * @Author: yangsen
 * @Date: 2023-01-04 10:57:54
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-05 18:37:45
 */
import type { Matrix4 } from 'three';
import { GLTFLoader } from '../loader/GLTFLoader';
interface fromGltfOptions<id> {
  url: string;
  show?: boolean;
  modelMatrix?: Matrix4;
  scale?: number;
  id?: id;
  allowPicking?: boolean;
}

/* TODO:1.cesium中的model的fromGltf()返回的是Model类本身，但是我还没有想明白Model和Primitive是如果统一的？都能通过add()添加到Primitives中 */
class Model {
  constructor() {}
  static fromGltf<id = unknown>(options: fromGltfOptions<id>) {
    const url = options.url;
    const loader = new GLTFLoader();
    loader.load(
      url,
      function (gltf) {
        const group = gltf.scene;
        return group;
      },
      function () {},
      function (error) {
        console.error(error);
      },
    );
  }
}
export { Model };
