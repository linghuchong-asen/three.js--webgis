/*
 * @Description: 支持材质着色的任意几何体外观
 * @Author: yangsen
 * @Date: 2023-01-30 10:01:14
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-08 15:06:00
 */
interface Options {
  material: any;
}
class MaterialAppearance {
  material: any;
  constructor(options: Options) {
    this.material = options.material.material;
  }
}
export { MaterialAppearance };
