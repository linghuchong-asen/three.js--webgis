import * as dat from './public/dat.gui.module.js';
console.log(dat);

const datGui = new dat.GUI({
  name: 'mygui',
  width: 300,
  closed: false,
});

let pointX = 0,
  pointY = 0,
  pointZ = 0,
  pointColor = '#ff0000',
  pointSize = 1,
  opacity = 1;
const pointObj = {
  x: 0,
  y: 0,
  z: 0,
  color: '#ff0000',
  size: 1,
  opacity: 1,
  addPoint: () => {
    scene.add(
      pointFun({
        x: pointX,
        y: pointY,
        z: pointZ,
        color: pointColor,
        size: pointSize,
        opacity: opacity,
      }),
    );
    console.log(scene);
    renderer.render(scene, camera);
  },
};

const pointFolder = datGui.addFolder('point');
pointFolder.add(pointObj, 'x').onChange((val) => {
  pointX = val;
});
pointFolder.add(pointObj, 'y').onChange((val) => {
  pointY = val;
});
pointFolder.add(pointObj, 'z').onChange((val) => {
  pointZ;
});
pointFolder.add(pointObj, 'addPoint');

export { datGui };
