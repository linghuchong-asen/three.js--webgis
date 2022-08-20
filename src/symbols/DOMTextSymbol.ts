/*
 * @Description:
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-08-18 10:30:34
 * @LastEditors: yangsen
 * @LastEditTime: 2022-08-19 10:25:05
 */
class DOMTextSymbol {
  dom: HTMLDivElement;
  constructor(text: string) {
    this.dom = document.createElement('div');
    this.dom.innerHTML = text;
    this.dom.style.fontSize = '10px';
    this.dom.style.fontFamily = '微软雅黑';
    this.dom.style.color = '#2980b9';
    this.dom.style.opacity = '1';
    this.dom.style.backgroundColor = '#80b929';
    this.dom.style.width = '10px';
    this.dom.style.height = '10px';
    this.dom.style.position = 'absolute';
    this.dom.style.left = '500px';
    this.dom.style.top = '10px';
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
