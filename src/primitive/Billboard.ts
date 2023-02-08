/*
 * @Description:广告牌
 * @Author: yangsen
 * @Date: 2023-02-08 17:05:58
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-08 17:31:22
 */
import { SpriteMaterial, Sprite } from 'three';
class Billboard {
  type: string;
  material: any;
  image: string;
  bi;

  constructor() {
    this.type = 'billboard';
    this.image = '';
    this.material = new SpriteMaterial();
    this.billboard = new Sprite(this.material);
  }
}
export { Billboard };
