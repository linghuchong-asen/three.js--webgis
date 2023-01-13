/*
 * @Description: 加载模型文件
 * @Author: yangsen
 * @Date: 2023-01-04 10:57:54
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-12 20:58:49
 */

import { Vector3 } from '../math/Vector3';
/* interface ModelData {
  data: Object3D | undefined;
} */

/* TODO:1.cesium中的model的fromGltf()返回的是Model类本身，但是我还没有想明白Model和Primitive是如何统一的？都能通过add()添加到Primitives中 */
class Model {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  position = new Vector3(0, 0, 0);
  type = 'model';
  name = '';
  isModelReady = false;
}
export { Model };
