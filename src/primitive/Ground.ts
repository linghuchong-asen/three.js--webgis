/*
 * @Description: 地面
 * @Author: yangsen
 * @Date: 2023-01-17 10:01:59
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-17 14:24:13
 */

import { Color } from '../math/Color';
import { MeshBasicMaterial } from '../material/MeshBasicMaterial';
import { PlaneGeometry } from '../geometries/PlaneGeometry';
import { Mesh } from '../mesh/Mesh';

class Ground {
  constructor() {
    this.ground.rotateX(-Math.PI / 2);
    this.ground.material.color = this.color;
  }
  color = new Color(206, 214, 224);
  private groundGeometryInit = new PlaneGeometry(1000, 1000);
  private groundMaterialInit = new MeshBasicMaterial({ side: 2 });
  ground = new Mesh(this.groundGeometryInit, this.groundMaterialInit);

  /* createGround() {
    this.groundMaterialInit.color = this.color;
    const ground = new Mesh(this.groundGeometryInit, this.groundMaterialInit);
    ground.rotateX(-Math.PI / 2);
    return ground;
  } */
}
export { Ground };
