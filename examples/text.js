import * as WEBGIS from '../build/bundle.module.js';
import { camera } from './Demo.js';

// 生成纹理文字
export const textureTextFun = (params) => {
  const text = new WEBGIS.TextureTextSymbol(params);

  var position = text.position;
  var canvas = text.material.map.image;

  if (canvas) {
    var poiRect = { w: canvas.width, h: canvas.height };
    var scale = getPoiScale(position, poiRect);
    text.scale.set(scale[0], scale[1], 1.0);
  }

  function getPoiScale(position, poiRect) {
    const container1 = document.getElementById('webgl-output');
    if (!position) return;
    var distance = camera.position.distanceTo(position);
    var top = Math.tan(((camera.fov / 2) * Math.PI) / 180) * distance; //camera.fov 相机的拍摄角度
    var meterPerPixel = (2 * top) / container1.clientHeight;
    var scaleX = poiRect.w * meterPerPixel;
    var scaleY = poiRect.h * meterPerPixel;
    return [scaleX, scaleY, 1.0];
  }

  return text;
};

// 生成DOM文字
export const DOMTextFun = (params) => {
  const text = new WEBGIS.DOMTextSymbol(params).dom;

  return text;
};
