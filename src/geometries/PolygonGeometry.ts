/*
 * @Description: 多边形
 * @Author: yangsen
 * @Date: 2023-01-29 21:10:03
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-06 08:31:14
 */
import {
  Shape,
  ShapeGeometry,
  ExtrudeBufferGeometry,
  Path,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  RepeatWrapping,
  MeshBasicMaterial,
  TextureLoader,
  Clock,
  DoubleSide,
  Mesh,
} from 'three';
import { chunkArray, getPngUrl } from '@/utils/utilFunction';

/* TODO:1.平面的多边形；2.使用拉伸方法实现拉伸；3.使用高度属性设置高度; 4.使用孔洞方法实现挖洞；5.是否带有边框线 */
class PolygonGeometry {
  positionArr: number[];
  geometry: ShapeGeometry;
  height: number;
  hasEdge: boolean;
  openFluidWll: boolean;
  outline: any;
  wall: any;

  constructor(positionArr: number[]) {
    this.positionArr = positionArr;
    this.createShape();
    this.geometry = this.createGeometry();
    this.height = 0;
    this.hasEdge = true;
    this.openFluidWll = false;
    this.outline = this.createEdge();
    this.wall = this.createWall();
  }
  private shape = new Shape();
  clock = new Clock();

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
    const geometry = new ShapeGeometry(this.shape);
    return geometry;
  }
  // 设置高度
  stretch(thickness: number) {
    const geometry = new ExtrudeBufferGeometry(this.shape, { depth: thickness });
    this.geometry = geometry;
  }
  // 设置孔洞
  setHole(positionArr: number[]) {
    const holePath = new Path();
    const length = this.positionArr.length;
    const isEven = length % 2 === 0 ? true : false;
    if (!isEven) {
      throw new Error('PolygonGeometry位置参数数量必须是偶数');
    }
    const doubleArr = chunkArray({ arr: positionArr, num: 2 });
    doubleArr.forEach((item, index) => {
      if (index === 0) {
        holePath.moveTo(item[0], item[1]);
      } else {
        holePath.lineTo(item[0], item[1]);
      }
    });
    holePath.lineTo(doubleArr[0][0], doubleArr[0][1]);
    this.shape.holes.push(holePath);
  }
  private createEdge = (color?: any) => {
    if (this.hasEdge) {
      const edgeGeometry = new EdgesGeometry(this.geometry);
      const edgeMaterial = new LineBasicMaterial({
        color: color === undefined ? 0x3742fa : color,
        linewidth: 10,
      });
      const edge = new LineSegments(edgeGeometry, edgeMaterial);
      return edge;
    } else {
      return null;
    }
  };
  // 设置边框线颜色
  setOutlineColor(color: any) {
    this.outline = this.createEdge(color);
  }
  // 特效墙
  createWall() {
    /* 两端材质 */
    const bottomMaterial = new MeshBasicMaterial({ visible: false });
    /* 四周材质 */
    const imgUrl = getPngUrl('red');
    const texTure = new TextureLoader().load(imgUrl);
    // 旋转纹理
    texTure.rotation = Math.PI / 2;
    const animate = () => {
      const delta = this.clock.getDelta();
      this.textureAnimator(texTure, 13, 1, 13, 300)(delta);
      requestAnimationFrame(animate);
    };

    const boxMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      map: texTure,
      side: DoubleSide,
    });
    const mesh = new Mesh(this.geometry, [bottomMaterial, boxMaterial]);
    return mesh;
  }
  private textureAnimator(texture: any, tilesHoriz: any, tilesVert: any, numTiles: any, tileDispDuration: any) {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    texture.repeat.set(1 / tilesHoriz, 1 / tilesVert);

    // 当前帧停留时长
    let currentDisplayTime = 0;

    // 当前帧
    let currentTile = 0;

    // 更新函数，通过这个函数对纹理位移进行更新
    return (milliSec: any) => {
      //  参数milliSec动画间隔时间是秒；每一帧停留时间单位毫秒
      currentDisplayTime += milliSec;
      /* 这里用时间判断可能就是想实现用指定的每帧时长进行动画，requestAnimationFrame速度太快且不可控 */
      while (currentDisplayTime > tileDispDuration) {
        currentDisplayTime -= tileDispDuration;
        currentTile++;
        // 播放完13帧从头开始播放
        if (currentTile === numTiles) {
          currentTile = 0;
        }
        /* 当前帧占总帧数的比例就是X,Y方向移动的距离；这个案例中的帧并不是指的某个API提供的功能，就是用了一下帧的概念，
        动画的形成主要靠的位置的移动，比如这里制定13帧，就是得到每次offset的移动距离是1/13 2/13...12/13，得到一个这样一串循环的数字，
        表示移动的距离 */
        const currentColumn = currentTile % numTiles;
        texture.offset.x = currentColumn / tilesHoriz;
        const currentRow = Math.floor(currentTile / numTiles);
        texture.offset.y = currentRow / tilesVert;
      }
    };
  }
}
export { PolygonGeometry };
