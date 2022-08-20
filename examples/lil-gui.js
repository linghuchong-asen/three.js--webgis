import * as WEBGIS from '../build/bundle.module.js';
import { pointFun } from './point.js';
import { renderer, scene, camera } from './Demo.js';

const gui = new WEBGIS.GUI();

let pointX = 0,
  pointY = 0,
  pointZ = 0,
  pointColor = '#ff0000',
  pointSize = 1,
  pointOpacity = 1,
  dynamicFlag = false;
const pointObj = {
  x: 0,
  y: 0,
  z: 0,
  color: '#ff0000',
  size: 1,
  opacity: 1,
  dynamicFlag: false,
  addPoint: () => {
    scene.add(
      pointFun({
        x: pointX,
        y: pointY,
        z: pointZ,
        color: pointColor,
        size: pointSize,
        opacity: pointOpacity,
      }),
    );

    renderer.render(scene, camera);
  },
};

const pointFolder = gui.addFolder('point');
pointFolder.add(pointObj, 'x', -10, 10, 0.1).onChange((val) => {
  pointX = val;
});
pointFolder.add(pointObj, 'y', -10, 10, 0.1).onChange((val) => {
  pointY = val;
});
pointFolder.add(pointObj, 'z', -10, 10, 0.1).onChange((val) => {
  pointZ = val;
});
pointFolder.addColor(pointObj, 'color').onChange((val) => {
  pointColor = val;
});
pointFolder.add(pointObj, 'size', 0, 5, 0.1).onChange((val) => {
  pointSize = val;
});
pointFolder.add(pointObj, 'opacity', 0, 1, 0.1).onChange((val) => {
  pointOpacity = val;
});
pointFolder.add(pointObj, 'dynamicFlag').onChange((val) => {
  console.log(val);
  dynamicFlag = val;
});
pointFolder.add(pointObj, 'addPoint');

/* const lineFoler = gui.addFolder('line')

const boxFolder = gui.addFolder('box')

const textFolder = gui.addFolder('text') */

export { gui, dynamicFlag };
