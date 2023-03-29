/*
 * @Description: 用于展示2D元素，html元素
 * @Author: yangsen
 * @Date: 2023-03-29 09:01:51
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-29 09:05:26
 */
class TwoDMaterial {
  material: any;
  constructor(material: any) {
    // 接收调用者传进来的html元素
    this.material = material
  }
  type='twoDMaterial'
}
export {TwoDMaterial}