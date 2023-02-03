/*
 * @Description: 图元
 * @Author: yangsen
 * @Date: 2023-01-30 19:49:31
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-30 20:15:20
 */
interface Options {
  geometryInstance: any;
  appearance: any;
}
class Primitive {
  constructor(options: Options) {}
  type = 'primitive';
}
export { Primitive };
