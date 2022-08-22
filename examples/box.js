import * as WEBGIS from '../build/bundle.module.js';
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
