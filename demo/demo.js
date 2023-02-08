/*
 * @Description:调用引擎API相关逻辑
 * @Author: yangsen
 * @Date: 2023-01-10 18:05:40
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-08 15:51:58
 */

import * as Webgis from '../build/bundle.module.js';

const viewer = new Webgis.Viewer('WebgisContainer');
const scene = viewer.scene;
/* 改变地面颜色 */
viewer.groundColor = new Webgis.Color(87, 96, 111);

/* 加载模型 */
const model = new Webgis.Model('./assets/housePlayground230113.glb');
// viewer.scene.primitives.append(model);
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

/* 添加区域  */
const positionArr = [5, 5, -5, 5, -5, -5, 5, -5];
const polygonGeometry = new Webgis.PolygonGeometry(positionArr);
// 设置拉伸高度
polygonGeometry.stretch(10);
polygonGeometry.openFluidWll = true;
const polygonMaterial = new Webgis.PolygonMaterial('#f1c40f');
viewer.scene.primitives.append(
  new Webgis.Primitive({
    geometryInstance: new Webgis.GeometryInstance({
      geometry: polygonGeometry,
    }),
    appearance: new Webgis.MaterialAppearance({
      material: polygonMaterial,
    }),
  }),
);

/* 添加墙 */
const wallPosition = [-7, 1, -15, 1, -15, 10, -7, 10]
const wallGeometry = new Webgis.WallGeometry(wallPosition);
const wallMaterial = new Webgis.WallMaterial();
viewer.scene.primitives.append(
  new Webgis.Primitive({
    geometryInstance: new Webgis.GeometryInstance({
      geometry: wallGeometry,
    }),
    appearance: new Webgis.MaterialAppearance({
      material: wallMaterial,
    }),
  }),
);

/* 添加线 */
const polylineGeometry = new Webgis.PolylineGeometry();
// 设置路径点
const polyline = [-10, 0, 10, 10, 10, 0, 10, 0, 0];
polylineGeometry.setPath(polyline);
const polylineMaterial = new Webgis.PolylineMaterial([147, 172, 130]);
// 设置线宽
polylineMaterial.lineWidth = 10
// 设置颜色
// 设置线类型（实线/虚线）
viewer.scene.primitives.append(
  new Webgis.Primitive({
    geometryInstance: new Webgis.GeometryInstance({
      geometry: polylineGeometry,
    }),
    appearance: new Webgis.MaterialAppearance({
      material: polylineMaterial,
    }),
  }),
);

/* 添加点 */
console.log(Webgis);
const pointGeometry = new Webgis.PointGeometry()
pointGeometry.setPosition([-16, 15, 15]);
const pointMaterial = new Webgis.PointMaterial()
pointMaterial.setSize(5)
viewer.scene.primitives.append(
  new Webgis.Primitive({
    geometryInstance: new Webgis.GeometryInstance({
      geometry: pointGeometry,
    }),
    appearance: new Webgis.MaterialAppearance({
      material: pointMaterial,
    }),
  }),
);
export {};
