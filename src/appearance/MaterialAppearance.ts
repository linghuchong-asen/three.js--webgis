/*
 * @Description: 支持材质着色的任意几何体外观
 * @Author: yangsen
 * @Date: 2023-01-30 10:01:14
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-02 21:06:49
 */
import { Appearance } from '@/appearance/Appearance';

interface Options {
  material: any;
}
class MaterialAppearance extends Appearance {
  material: any;
  constructor(options: Options) {
    super();
    this.material = options.material;
  }
}
export { MaterialAppearance };
