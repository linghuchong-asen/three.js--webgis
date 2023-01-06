/*
 * @Description:
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-18 10:30:34
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-22 14:03:00
 */

interface Prams {
  left?: number;
  top?: number;
  text?: string;
  fontFamily?: string;
  fontSize?: string;
  fontColor?: string;
  fontOpacity?: string;
  backgroundColor?: string;
}
class DOMTextSymbol {
  dom: HTMLDivElement;
  left?: string;
  top?: string;
  text?: string;
  fontFamily?: string;
  fontSize?: string;
  fontColor?: string;
  fontOpacity?: string;
  backgroundColor?: string;
  constructor(params: Prams) {
    this.left = params.left === undefined ? '0px' : params.left.toString() + 'px';
    this.top = params.top === undefined ? '0px' : params.top.toString() + 'px';
    this.text = params.text === undefined ? '聚米画沙' : params.text;
    this.fontFamily = params.fontFamily === undefined ? 'arial' : params.fontFamily;
    this.fontSize = params.fontSize === undefined ? '16px' : params.fontSize;
    this.fontColor = params.fontColor === undefined ? '#fff' : params.fontColor;
    this.fontOpacity = params.fontOpacity === undefined ? '1' : params.fontOpacity;
    this.backgroundColor = params.backgroundColor === undefined ? '#2980b9' : params.backgroundColor;

    this.dom = document.createElement('div');
    this.dom.innerHTML = this.text;
    this.dom.style.fontSize = this.fontSize;
    this.dom.style.fontFamily = this.fontFamily;
    this.dom.style.color = this.fontColor;
    this.dom.style.opacity = this.fontOpacity;
    this.dom.style.backgroundColor = this.backgroundColor;
    this.dom.style.padding = '16px';
    this.dom.style.position = 'absolute';
    this.dom.style.left = this.left;
    this.dom.style.top = this.top;
  }
  // 设置字体 大小 颜色 透明度 背景色 元素大小 背景图片 位置
  setFontSize(size: string) {
    this.dom.style.fontSize = size;
  }
  setFontFamily(fontFamily: string) {
    this.dom.style.fontFamily = fontFamily;
  }
  setColor(color: string) {
    this.dom.style.color = color;
  }
  setOpacity(opacity: string) {
    this.dom.style.opacity = opacity;
  }
  setBackgroundColor(backgroundColor: string) {
    this.dom.style.backgroundColor = backgroundColor;
  }
  setWidth(width: string) {
    this.dom.style.width = width;
  }
  setHeight(height: string) {
    this.dom.style.height = height;
  }
  setPositionLeft(left: string) {
    this.dom.style.left = left;
  }
  setPositionTop(top: string) {
    this.dom.style.top = top;
  }
}

export { DOMTextSymbol };
