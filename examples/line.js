import * as WEBGIS from '../build/bundle.module.js';
import { camera, scene, Model } from './Demo.js';

// 生成线函数
export const lineCreateFun = (params) => {
  const line = new WEBGIS.LineSymbol(params);

  return line;
};

// 生成虚线函数
export const dottedLineFun = (params) => {
  const lineDotted = new WEBGIS.LineDottedSymbol(params);

  return lineDotted;
};
