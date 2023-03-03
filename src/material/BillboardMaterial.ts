/*
 * @Description:广告牌
 * @Author: yangsen
 * @Date: 2023-02-14 17:54:55
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-15 09:54:47
 */
import { SpriteMaterial, TextureLoader } from 'three';
class BillboardMaterial {
  type: string;
  material: any;
  _image: string;

  constructor() {
    this.type = 'billboardMaterial';
    this._image = '';
    this.material = new SpriteMaterial();
  }
  // 图片
  set image(url: string) {
    const map = new TextureLoader().load(url);
    this.material.map = map;
    this._image = url;
  }
  get image() {
    return this._image;
  }
}
export { BillboardMaterial };
