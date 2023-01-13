/*
 * @Description:调用引擎API相关逻辑
 * @Author: yangsen
 * @Date: 2023-01-10 18:05:40
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-13 14:58:22
 */

import * as Webgis from '../build/bundle.module.js';

const viewer = new Webgis.Viewer('WebgisContainer');
const scene = viewer.scene;

/* 加载模型 */
const model = new Webgis.Model('./assets/housePlayground230113.glb');
viewer.scene.primitives.append(model);
model.position = new Webgis.Vector3(10, 2, 0);

/* 拾取点 */
document.addEventListener('click', (e) => {
  const position = new Webgis.Vector2();
  position.x = e.clientX;
  position.y = e.clientY;

  if (model.isModelReady) {
    const point = viewer.pickPosition(position);

    document.getElementById('x').innerHTML = point.x;
    document.getElementById('y').innerHTML = point.y;
    document.getElementById('z').innerHTML = point.z;
  }
});

export {};
