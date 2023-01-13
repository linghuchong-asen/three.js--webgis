/*
 * @Description: 用于Entity的ModelGraphics
 * @Author: yangsen
 * @Date: 2023-01-06 10:58:59
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-06 11:26:46
 */
interface ModelGraphicsParam {
  url: string;
}
class ModelGraphics {
  url: string;

  constructor(param: ModelGraphicsParam) {
    this.url = param.url;
  }
}

export { ModelGraphics };
