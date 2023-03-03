/*
 * @Description: 墙-材质
 * @Author: yangsen
 * @Date: 2023-02-08 08:39:11
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-02 20:33:34
 */
import { MeshBasicMaterial, DoubleSide, TextureLoader, Clock } from 'three';
import { getPngUrl, translateColor } from '@/utils/utilFunction';
import { TextureAnimator } from '@/common/animation/textureAnimator';
import { Color } from '@/math/Color';

class WallMaterial {
  material: any;
  type: string;
  _isFluid: boolean;
  color: Color;
  constructor(color: Color) {
    this.material = this.createWall(color);
    this.type = 'wallMaterial';
    this._isFluid = false;
    this.color = color;
  }
  private createWall(color: Color) {
    /* 两端材质 */
    const bottomMaterial = new MeshBasicMaterial({ visible: false, transparent: true });
    /* 四周材质 */
    const sideMaterial = new MeshBasicMaterial({
      color: translateColor(color),
      transparent: true,
      side: DoubleSide,
    });
    if (color.alpha !== 1) {
      sideMaterial.opacity = color.alpha;
    }
    if (!this._isFluid) {
      return [bottomMaterial, sideMaterial];
    } else {
      return this.fluidWall();
    }
  }
  // 流体墙
  private fluidWall() {
    const clock = new Clock();
    /* 两端材质 */
    const bottomMaterial = new MeshBasicMaterial({ visible: false, transparent: true });
    /* 四周材质 */
    const imgUrl = getPngUrl('test2');
    const texTure = new TextureLoader().load(imgUrl);
    // 旋转纹理
    texTure.rotation = Math.PI / 2;
    const arrowAni = new TextureAnimator(texTure, 10, 1, 13, 75);
    setInterval(() => {
      const delta = clock.getDelta();
      arrowAni.update(delta * 1000);
    }, 1);
    const sideMaterial = new MeshBasicMaterial({
      transparent: true,
      opacity: this.color.alpha === 1 ? 0.7 : this.color.alpha,
      map: texTure,
      side: DoubleSide,
    });
    return [bottomMaterial, sideMaterial];
  }
  set isFluid(value: boolean) {
    this._isFluid = value;
    this.material = this.createWall(this.color);
  }
  get isFluid() {
    return this._isFluid;
  }
}
export { WallMaterial };
