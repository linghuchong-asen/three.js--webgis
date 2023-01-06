/*
 * @Description: 图元组
 * @Author: yangsen
 * @Date: 2023-01-05 18:21:33
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-05 18:35:21
 */
import { Group } from 'three';
class PrimitiveGroup extends Group {
  constructor() {
    super();
  }
  /* TODO:因为Group中已经有了add()方法，这里就没有再次写一遍，等之后拿出add()--2023.01.05 */
}
export { PrimitiveGroup };
