/*
 * @Description: 图元
 * @Author: yangsen
 * @Date: 2023-01-30 19:49:31
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-03 15:34:08
 */
interface Options {
  geometryInstances: any;
  appearance: any;
  id: string;
  show: boolean;
  select: boolean;
}
class Primitive {
  geometryInstances: any;
  appearance: any;
  id: undefined | string;
  geometryType: string;
  show: boolean;
  select: boolean;
  constructor(options: Options) {
    this.geometryInstances = options.geometryInstances;
    this.appearance = options.appearance;
    this.id = options.id;
    this.geometryType = options.geometryInstances.geometry.type;
    this.show = options.show === undefined ? true : options.show;
    this.select = options.select === undefined ? true : options.select;
  }
  type = 'primitive';
}
export { Primitive };
