import * as WEBGIS from '../build/bundle.module.js';
import { raycaster, camera, scene } from './Demo.js';

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
  raycaster.setFromCamera(pointer, camera);

  const intersections = raycaster.intersectObject(Model.children[2], true);

  intersection = intersections.length > 0 ? intersections[0] : null;

  if (intersection !== null) {
    screenPosition = intersection.point;
  }

  const point = new WEBGIS.PointSymbol();
  point.setSize(2);
  point.position.set(intersection.point.x, intersection.point.y + 1, intersection.point.z);
  return point;
};

// 选中点功能
export const selectPointFun = (event) => {
  const pointer = new WEBGIS.Vector2();
  pointer.x = event.x;
  pointer.y = event.y;
  raycaster.setFromCamera(pointer, camera);

  const pointsObject = scene.children.filter((item) => item.isPoints === true);
  console.log(pointsObject);
  if (pointsObject.length === 1) {
    const intersection = raycaster.intersectObject(pointsObject[0], true);
    console.log(intersection);
  } else if (pointsObject.length > 1) {
    const intersections = raycaster.intersectObjects(pointsObject, true);
    console.log(intersections);
  }

  // const intersection = intersections.length > 0 ? intersections[0] : null;

  // console.log(intersection);
};
