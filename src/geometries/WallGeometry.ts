/*
 * @Description: 墙
 * @Author: yangsen
 * @Date: 2023-02-08 08:32:56
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-02 10:44:50
 */
import { Shape, ShapeGeometry, ExtrudeBufferGeometry, Vector2 } from 'three';

class WallGeometry {
  positionArr: Vector2[];
  geometry: ShapeGeometry;
  height: number;
  hasEdge: boolean;
  openFluidWll: boolean;
  type: string;

  constructor(positionArr: Vector2[]) {
    this.positionArr = positionArr;
    this.createShape();
    this.geometry = this.createGeometry();
    this.height = 0;
    this.hasEdge = true;
    this.openFluidWll = false;
    this.type = 'wallGeometry';
  }
  private shape = new Shape();

  private createShape() {
    this.positionArr.forEach((item, index) => {
      if (index === 0) {
        this.shape.moveTo(item.x, item.y);
      } else {
        this.shape.lineTo(item.x, item.y);
      }
    });
    this.shape.lineTo(this.positionArr[0].x, this.positionArr[0].y);
  }
  private createGeometry() {
    const geometry = new ExtrudeBufferGeometry(this.shape, { depth: 1 });
    return geometry;
  }
  // 设置高度
  stretch(thickness: number) {
    const geometry = new ExtrudeBufferGeometry(this.shape, { depth: thickness });
    this.geometry = geometry;
  }
}
export { WallGeometry };
