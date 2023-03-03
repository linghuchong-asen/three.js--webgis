/*
 * @Description:贴图动画;最开始为了流体墙设计，后面其他需要贴图动画也可以使用
 * @Author: yangsen
 * @Date: 2023-03-01 13:24:19
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-02 09:43:40
 */
import { RepeatWrapping } from 'three';
class TextureAnimator {
  texture: any;
  tilesHorizontal: any;
  tilesVertical: any;
  numberOfTiles: any;
  tileDisplayDuration: any;
  currentDisplayTime: any;
  currentTile: any;

  constructor(texture: any, tilesHoriz: any, tilesVert: any, numTiles: any, tileDispDuration: any) {
    this.texture = texture;
    this.tilesHorizontal = tilesHoriz; // 水平方向位置
    this.tilesVertical = tilesVert; // 垂直方向
    this.numberOfTiles = numTiles; // 序列图中的帧数
    this.texture.wrapS = RepeatWrapping;
    this.texture.wrapT = RepeatWrapping;
    this.texture.repeat.set(1 / 7, 1 / this.tilesVertical);
    this.tileDisplayDuration = tileDispDuration; // 每一帧停留时长
    this.currentDisplayTime = 0; // 当前帧停留时长
    this.currentTile = 0; // 当前帧
  }

  // 更新函数，通过这个函数对纹理位移进行更新
  update(milliSec: any) {
    this.currentDisplayTime += milliSec;

    /* 这里用时间判断可能就是想实现用指定的每帧时长进行动画，requestAnimationFrame速度太快且不可控 */
    while (this.currentDisplayTime > this.tileDisplayDuration) {
      this.currentDisplayTime -= this.tileDisplayDuration;
      this.currentTile++;
      // 播放完13帧从头开始播放
      if (this.currentTile === this.numberOfTiles) {
        this.currentTile = 0;
      }
      /* 当前帧占总帧数的比例就是X,Y方向移动的距离；这个案例中的帧并不是指的某个API提供的功能，就是用了一下帧的概念，
      动画的形成主要靠的位置的移动，比如这里制定13帧，就是得到每次offset的移动距离是1/13 2/13...12/13，得到一个这样一串循环的数字，
      表示移动的距离 */
      const currentColumn = this.currentTile % this.numberOfTiles;
      this.texture.offset.x = currentColumn / this.numberOfTiles;
      const currentRow = Math.floor(this.currentTile / this.numberOfTiles);
      this.texture.offset.y = currentRow / this.tilesVertical;
    }
  }
}
export { TextureAnimator };
