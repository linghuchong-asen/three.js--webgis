/*
 * @Description: 墙-材质
 * @Author: yangsen
 * @Date: 2023-02-08 08:39:11
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-08 08:47:10
 */
import { MeshBasicMaterial, DoubleSide } from 'three';
class WallMaterial {
  material: any;
  type: string;
  constructor() {
    this.material = this.createWall();
    this.type = 'wallMaterial';
  }
  private createWall() {
    /* 两端材质 */
    const bottomMaterial = new MeshBasicMaterial({ visible: false });
    /* 四周材质 */
    const sideMaterial = new MeshBasicMaterial({
      color: 0x99bcac,
      transparent: true,
      side: DoubleSide,
    });
    return [bottomMaterial, sideMaterial];
  }
}
export { WallMaterial };
