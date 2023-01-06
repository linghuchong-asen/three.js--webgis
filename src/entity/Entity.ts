/*
 * @Description: Entity实体
 * @Author: yangsen
 * @Date: 2023-01-06 10:09:36
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-06 11:49:37
 */
import type { Vector3 } from 'three';
import type { ModelGraphics } from './graphics/ModelGraphics';
interface EntityParams {
  model?: ModelGraphics;
  position?: Vector3;
}

class Entity {
  position: Vector3 | undefined;
  model: ModelGraphics | undefined;
  constructor(options: EntityParams) {
    this.model = options.model;
    this.position = options.position;
  }
}
export { Entity };
