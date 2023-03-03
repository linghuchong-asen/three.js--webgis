/*
 * @Description:模型几何体
 * @Author: yangsen
 * @Date: 2023-02-15 16:51:33
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-20 14:47:16
 */
import { Vector3 } from 'three';
class ModelGeometry {
  constructor() {}
  type = 'modelGeometry';
  position = new Vector3(0, 0, 0);
  isModelReady = false;
}
export { ModelGeometry };
