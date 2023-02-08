/*
 * @Description: 图元
 * @Author: yangsen
 * @Date: 2023-01-30 19:49:31
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-06 07:57:32
 */
interface Options {
  geometryInstance: any;
  appearance: any;
}
class Primitive {
  geometry: any;
  material: any;
  constructor(options: Options) {
    this.geometry = options.geometryInstance.geometry;
    this.material = options.appearance.material;
  }
  type = 'primitive';
}
export { Primitive };
