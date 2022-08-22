import * as WEBGIS from '../build/bundle.module.js';
import { camera, scene, Model } from './Demo.js';

export let _deletePointObject;
// 生成单个点函数
export const pointFun = (params) => {
  // 添加点
  const point = new WEBGIS.PointSymbol(params);
  return point;
};

// 生成连续点函数
export const seriesPointsFun = () => {
  const seriesPoints = [];
  for (let i = 0; i < 40; i++) {
    const point = new WEBGIS.PointSymbol();
    seriesPoints.push(point);
  }
  return seriesPoints;
};

// 屏幕拾取生成点坐标
export const pointPickupFun = (event) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;

  /* 在空间中随意取点 */
  //标准设备坐标(z=0.5这个值并没有一个具体的说法);我看three.js源码raycaster的.setFromCamera中也使用的0.5
  // const stdVector = new WEBGIS.Vector3(x, y, 0.5);
  // const worldVector = stdVector.unproject(camera);
  // console.log(worldVector);

  /* 在物体上取点 */
  const pointer = new WEBGIS.Vector2();
  pointer.x = x;
  pointer.y = y;

  const raycasterPickUp = new WEBGIS.Raycaster();
  raycasterPickUp.setFromCamera(pointer, camera);

  const intersections = raycasterPickUp.intersectObject(Model.children[2], true);

  const intersection = intersections.length > 0 ? intersections[0] : null;

  let screenPosition;
  if (intersection !== null) {
    screenPosition = intersection.point;

    const point = new WEBGIS.PointSymbol();
    point.setSize(2);
    point.position.set(screenPosition.x, screenPosition.y + 1, screenPosition.z);
    scene.add(point);
  }
};

// 选中点功能
export const selectPointFun = (event) => {
  const pointer = new WEBGIS.Vector2();
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster1 = new WEBGIS.Raycaster();
  raycaster1.setFromCamera(pointer, camera);

  const pointsObject = scene.children.filter((item) => item.isPoints === true);

  const intersects = raycaster1.intersectObjects(pointsObject, true);

  if (intersects.length > 0) {
    _deletePointObject = intersects[0].object;

    intersects[0].object.setSize(intersects[0].object.getSize() * 1.5);
    setTimeout(() => {
      intersects[0].object.setSize((intersects[0].object.getSize() * 2) / 3);
    }, 500);
  }
};

// 删除点功能
export const deletePointFun = (deletePointObject) => {
  deletePointObject.geometry.dispose();
  deletePointObject.material.dispose();
  scene.remove(deletePointObject);
};
