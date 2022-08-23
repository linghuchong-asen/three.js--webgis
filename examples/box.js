import * as WEBGIS from '../build/bundle.module.js';
import { camera, scene } from './Demo.js';

export let _deleteBoxObject;
// 生成立方体
export const createBoxFun = (params) => {
  const cube = new WEBGIS.BoxSymbol(params);
  cube.position.set(0, 1, 0);
  // cube.setColor('#000000')
  // cube.scale.set(10,10,10)
  // scene.add(cube)
  // renderer.render(scene,camera)
  return cube;
};

// 选中立方体功能
export const selectBoxFun = (event) => {
  const pointer = new WEBGIS.Vector2();
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster1 = new WEBGIS.Raycaster();
  raycaster1.setFromCamera(pointer, camera);

  const boxObject = scene.children.filter((item) => item.isBoxSymbol === true);

  const intersects = raycaster1.intersectObjects(boxObject, true);

  if (intersects.length > 0) {
    _deleteBoxObject = intersects[0].object;

    intersects[0].object.scale.set(1.25, 1.25, 1.25);
    setTimeout(() => {
      intersects[0].object.scale.set(1, 1, 1);
    }, 500);
  }
};

// 删除点功能
export const deleteBoxFun = (deletePointObject) => {
  deletePointObject.geometry.dispose();
  deletePointObject.material.dispose();
  scene.remove(deletePointObject);
};
