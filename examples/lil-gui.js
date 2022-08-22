import * as WEBGIS from '../build/bundle.module.js';
import { pointFun, deletePointFun, _deletePointObject } from './point.js';
import { renderer, scene, camera, _getPointPosition } from './Demo.js';
import { lineCreateFun, dottedLineFun } from './line.js';
import { createBoxFun } from './box.js';
import { textureTextFun, DOMTextFun } from './text.js';

const gui = new WEBGIS.GUI();

const obj = {
  getPositionVisible: false,
};
let _getPositionVisible = false;
gui.add(obj, 'getPositionVisible').onChange((val) => {
  _getPositionVisible = val;
});
let dynamicFlag = false;
const point = () => {
  let pointX = 0,
    pointY = 0,
    pointZ = 0,
    pointColor = '#ff0000',
    pointSize = 1,
    pointOpacity = 1;

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
    deletePoint: () => {
      deletePointFun(_deletePointObject);
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
  pointFolder.add(pointObj, 'deletePoint');
};
point();

const line = () => {
  let lineX1 = 0,
    lineY1 = 0,
    lineZ1 = 0,
    lineX2 = 5,
    lineY2 = 5,
    lineZ2 = 5,
    lineColor = 0x6094ea,
    lineWidth = 1;
  const lineObj = {
    x1: 0,
    y1: 0,
    z1: 0,
    x2: 5,
    y2: 5,
    z2: 5,
    lineWidth: 1,
    lineColor: 0x6094ea,
    addLine: () => {
      scene.add(
        lineCreateFun({
          x1: lineX1,
          y1: lineY1,
          z1: lineZ1,
          x2: lineX2,
          y2: lineY2,
          z2: lineZ2,
          lineWidth,
          lineColor,
        }),
      );
      renderer.render(scene, camera);
    },
  };
  const lineFolder = gui.addFolder('line');

  lineFolder.add(lineObj, 'x1', -10, 10, 0.1).onChange((val) => {
    lineX1 = val;
  });
  lineFolder.add(lineObj, 'y1', -10, 10, 0.1).onChange((val) => {
    lineY1 = val;
  });
  lineFolder.add(lineObj, 'z1', -10, 10, 0.1).onChange((val) => {
    lineZ1 = val;
  });
  lineFolder.add(lineObj, 'x2', -10, 10, 0.1).onChange((val) => {
    lineX2 = val;
  });
  lineFolder.add(lineObj, 'y2', -10, 10, 0.1).onChange((val) => {
    lineY2 = val;
  });
  lineFolder.add(lineObj, 'z2', -10, 10, 0.1).onChange((val) => {
    lineZ2 = val;
  });
  lineFolder.add(lineObj, 'lineWidth', -10, 10, 0.1).onChange((val) => {
    lineWidth = val;
  });
  lineFolder.addColor(lineObj, 'lineColor').onChange((val) => {
    lineColor = val;
  });
  lineFolder.add(lineObj, 'addLine');
  lineFolder.close();
};
line();

const lineDotted = () => {
  let lineDottedX1 = 0,
    lineDottedY1 = 0,
    lineDottedZ1 = 0,
    lineDottedX2 = 5,
    lineDottedY2 = 5,
    lineDottedZ2 = 5,
    lineDottedColor = 0x6094ea,
    lineDottedWidth = 1;
  const lineDottedObj = {
    x1: 0,
    y1: 0,
    z1: 0,
    x2: 5,
    y2: 5,
    z2: 5,
    lineDottedWidth: 1,
    lineDottedColor: 0x6094ea,
    addLineDotted: () => {
      scene.add(
        dottedLineFun({
          x1: lineDottedX1,
          y1: lineDottedY1,
          z1: lineDottedZ1,
          x2: lineDottedX2,
          y2: lineDottedY2,
          z2: lineDottedZ2,
          lineDottedWidth,
          lineDottedColor,
        }),
      );
      renderer.render(scene, camera);
    },
  };
  const lineDottedFolder = gui.addFolder('lineDotted');

  lineDottedFolder.add(lineDottedObj, 'x1', -10, 10, 0.1).onChange((val) => {
    lineDottedX1 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'y1', -10, 10, 0.1).onChange((val) => {
    lineDottedY1 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'z1', -10, 10, 0.1).onChange((val) => {
    lineDottedZ1 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'x2', -10, 10, 0.1).onChange((val) => {
    lineDottedX2 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'y2', -10, 10, 0.1).onChange((val) => {
    lineDottedY2 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'z2', -10, 10, 0.1).onChange((val) => {
    lineDottedZ2 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'lineDottedWidth', -10, 10, 0.1).onChange((val) => {
    lineDottedWidth = val;
  });
  lineDottedFolder.addColor(lineDottedObj, 'lineDottedColor').onChange((val) => {
    lineDottedColor = val;
  });
  lineDottedFolder.add(lineDottedObj, 'addLineDotted');
  lineDottedFolder.close();
};
lineDotted();

const boxGui = () => {
  let boxWidth = 1,
    boxHeight = 1,
    boxDepth = 1,
    boxColor = 0xee5253,
    boxMap = undefined;
  const boxObj = {
    width: 1,
    height: 1,
    depth: 1,
    boxColor: 0xee5253,
    boxMap: undefined,
    addBox: () => {
      scene.add(
        createBoxFun({
          with: boxWidth,
          height: boxHeight,
          width: boxDepth,
          boxColor,
          boxMap,
        }),
      );
      renderer.render(scene, camera);
    },
  };
  const boxFolder = gui.addFolder('box');

  boxFolder.add(boxObj, 'width', 0, 10, 0.1).onChange((val) => {
    boxWidth = val;
  });
  boxFolder.add(boxObj, 'height', 0, 10, 0.1).onChange((val) => {
    boxHeight = val;
  });
  boxFolder.add(boxObj, 'depth', 0, 10, 0.1).onChange((val) => {
    boxDepth = val;
  });
  boxFolder
    .add(boxObj, 'boxMap', {
      null: undefined,
      sea: '../../examples/public/img/sea.jpg',
      desert: '../../examples/public/img/desert.jpg',
      forest: '../../examples/public/img/forest.jpg',
    })
    .onChange((val) => {
      boxMap = val;
    });
  boxFolder.addColor(boxObj, 'boxColor').onChange((val) => {
    boxColor = val;
  });
  boxFolder.add(boxObj, 'addBox');
  boxFolder.close();
};
boxGui();

const textGui = () => {
  let x = 0,
    y = 0,
    z = 0,
    text = '聚米画沙',
    fontFamily = 1,
    fontSize = 1,
    fontColor = 1,
    fontOpacity = 0xee5253,
    backgroundColor = '#2980b9',
    moveToObject = false;

  const textObj = {
    x: 0,
    y: 0,
    z: 0,
    text: '聚米画沙',
    fontFamily: 1,
    fontSize: 1,
    fontColor: 1,
    fontOpacity: 0xee5253,
    backgroundColor: '#2980b9',
    moveToObject: false,
    addText: () => {
      scene.add(
        textureTextFun({
          x,
          y,
          z,
          text,
          fontFamily,
          fontSize,
          fontColor,
          fontOpacity,
          backgroundColor,
        }),
      );
      renderer.render(scene, camera);
    },
  };
  const cantainer = document.getElementById('webgl-output');
  cantainer.addEventListener('click', function () {
    if (moveToObject === true) {
      const textObject = scene.children.find((item) => item.isTextureTextSymbol === true);

      textObject.position.set(_getPointPosition.x + 2, _getPointPosition.y + 3, _getPointPosition.z);
    }
  });
  const textFolder = gui.addFolder('textureText');

  textFolder.add(textObj, 'x', -10, 10, 1).onChange((val) => {
    x = val;
  });
  textFolder.add(textObj, 'y', -10, 10, 1).onChange((val) => {
    y = val;
  });
  textFolder.add(textObj, 'z', -10, 10, 1).onChange((val) => {
    z = val;
  });
  textFolder.add(textObj, 'text').onChange((val) => {
    text = val;
  });
  textFolder.add(textObj, 'fontFamily', ['arial', '微软雅黑']).onChange((val) => {
    fontFamily = val;
  });
  textFolder.add(textObj, 'fontSize', 0, 10, 0.1).onChange((val) => {
    fontSize = val;
  });
  textFolder.addColor(textObj, 'fontColor').onChange((val) => {
    fontColor = val;
  });
  textFolder.add(textObj, 'fontOpacity', 0, 1, 0.1).onChange((val) => {
    fontOpacity = val;
  });
  textFolder.addColor(textObj, 'backgroundColor').onChange((val) => {
    backgroundColor = val;
  });
  textFolder.add(textObj, 'moveToObject').onChange((val) => {
    moveToObject = val;
  });

  textFolder.add(textObj, 'addText');
  textFolder.close();
};
textGui();

const DOMTextGui = () => {
  let left = 100,
    top = 10,
    text = '聚米画沙',
    fontFamily = 1,
    fontSize = 1,
    fontColor = 1,
    fontOpacity = 0xee5253,
    backgroundColor = '#2980b9';

  const textObj = {
    left: 100,
    top: 10,
    text: '聚米画沙',
    fontFamily: 1,
    fontSize: 1,
    fontColor: 1,
    fontOpacity: 0xee5253,
    backgroundColor: '#2980b9',
    moveToObject: false,
    addText: () => {
      document.body.appendChild(
        DOMTextFun({
          left,
          top,
          text,
          fontFamily,
          fontSize,
          fontColor,
          fontOpacity,
          backgroundColor,
        }),
      );
      renderer.render(scene, camera);
    },
  };

  const textFolder = gui.addFolder('DOMText');

  textFolder.add(textObj, 'left', 0, 1920, 1).onChange((val) => {
    left = val;
  });
  textFolder.add(textObj, 'top', 0, 1080, 1).onChange((val) => {
    top = val;
  });
  textFolder.add(textObj, 'text').onChange((val) => {
    text = val;
  });
  textFolder.add(textObj, 'fontFamily', ['arial', '微软雅黑']).onChange((val) => {
    fontFamily = val;
  });
  textFolder.add(textObj, 'fontSize', 0, 10, 0.1).onChange((val) => {
    fontSize = val;
  });
  textFolder.addColor(textObj, 'fontColor').onChange((val) => {
    fontColor = val;
  });
  textFolder.add(textObj, 'fontOpacity', 0, 1, 0.1).onChange((val) => {
    fontOpacity = val;
  });
  textFolder.addColor(textObj, 'backgroundColor').onChange((val) => {
    backgroundColor = val;
  });

  textFolder.add(textObj, 'addText');
  textFolder.close();
};
DOMTextGui();

export { gui, dynamicFlag, _getPositionVisible };
