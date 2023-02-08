/*
 * @Description: 墙
 * @Author: yangsen
 * @Date: 2023-02-08 08:32:56
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-08 08:48:48
 */
import { Shape, ShapeGeometry, ExtrudeBufferGeometry } from 'three';
import { chunkArray } from '@/utils/utilFunction';
class WallGeometry {
  positionArr: number[];
  geometry: ShapeGeometry;
  height: number;
  hasEdge: boolean;
  openFluidWll: boolean;
  type: string;

  constructor(positionArr: number[]) {
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
    const length = this.positionArr.length;
    const isEven = length % 2 === 0 ? true : false;
    if (!isEven) {
      throw new Error('PolygonGeometry位置参数数量必须是偶数');
    }
    const doubleArr = chunkArray({ arr: this.positionArr, num: 2 });
    doubleArr.forEach((item, index) => {
      if (index === 0) {
        this.shape.moveTo(item[0], item[1]);
      } else {
        this.shape.lineTo(item[0], item[1]);
      }
    });
    this.shape.lineTo(doubleArr[0][0], doubleArr[0][1]);
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
