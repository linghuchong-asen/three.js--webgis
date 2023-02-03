/*
 * @Description:调用引擎API相关逻辑
 * @Author: yangsen
 * @Date: 2023-01-10 18:05:40
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-30 13:17:03
 */

import * as Webgis from '../build/bundle.module.js';

const viewer = new Webgis.Viewer('WebgisContainer');
const scene = viewer.scene;
/* 改变地面颜色 */
viewer.groundColor = new Webgis.Color(127, 140, 141);

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

/* 修改天空盒 */
/* viewer.setSkyBox({
  px: './assets/textures/roomBox/px.jpg',
  mx: './assets/textures/roomBox/nx.jpg',
  py: './assets/textures/roomBox/py.jpg',
  my: './assets/textures/roomBox/ny.jpg',
  pz: './assets/textures/roomBox/pz.jpg',
  mz: './assets/textures/roomBox/nz.jpg',
},true); */

export {};
