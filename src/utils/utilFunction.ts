import { Color } from '@/math/Color';
import { Color as ThreeColor } from 'three';
/**
 * @@description: 将传入的arr切割成num长度的多个小数组。
 * @param {chunkArrayParam} params
 */
interface chunkArrayParam {
  arr: any[];
  num: number;
}
export const chunkArray = (params: chunkArrayParam) => {
  let newArr: any[] = [];
  params.arr.map((item, index) => {
    const newArrIndex = index % params.num;
    if (newArrIndex === 0) {
      newArr.push([]);
    }
    newArr[newArr.length - 1].push(item);
  });
  return newArr;
};

/* 获取jpg图片地址 */
export const getJpgUrl = (url: string) => {
  const { href } = new URL(`./assets/${url}.jpg`, import.meta.url);
  return href;
};
/* 获取png图片地址 */
export const getPngUrl = (url: string) => {
  const { href } = new URL(`../src/assets/${url}.png`, import.meta.url);
  return href;
};

/* 16进制对照表 */
export const hexArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
/* RGB转16进制颜色 */
export const RGBTranslateHex = (param: [number, number, number]): string => {
  let hexStr = '0x';
  param.forEach((item, index) => {
    const quotient = hexArr[Math.floor(param[index] / 16)];
    const remainder = param[index] % 16;
    hexStr += quotient + remainder;
  });
  return hexStr;
};

/* 获取数组最大值 */
export const arrMaxNum = (arr: Array<any>) => {
  let max: number = 1;
  arr.forEach((item) => {
    if (item > max) {
      max = item;
    }
  });
  return max;
};

/* rgba转换为three.js的color需要的rgb */
export const translateColor = (color: Color) => {
  const threeColor = new ThreeColor(`rgb(${color.r * 255},${color.g * 255},${color.b * 255})`);
  return threeColor;
};
