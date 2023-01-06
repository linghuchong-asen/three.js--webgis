/*
 * @Description: 实体组，用于管理实体。
 * @Author: yangsen
 * @Date: 2023-01-06 11:56:47
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-06 15:56:58
 */
import type { ModelGraphicsInstance } from './typings/ModelGraphicsInstance';
import type { EntityInstance } from './typings/EntityInstance';
class EntityGroup {
  constructor() {}
  add(options: EntityInstance): ModelGraphicsInstance[] {
    const modelArr: ModelGraphicsInstance[] = [];
    if (options.model) {
      modelArr.push(options.model);
    }
    return modelArr;
  }
}

export { EntityGroup };
