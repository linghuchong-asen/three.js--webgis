import { Vector3 } from 'three';
import { ModelGraphicsInstance } from './ModelGraphicsInstance';

export interface EntityInstance {
  position?: Vector3;
  model?: ModelGraphicsInstance;
}
