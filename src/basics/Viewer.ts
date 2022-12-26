/*
 * @Description:Viewer类
 * @Author: yangsen
 * @Date: 2022-12-19 10:38:45
 * @LastEditors: yangsen
 * @LastEditTime: 2022-12-19 11:54:07
 */
class Viewer {
  containerId: HTMLElement | null;

  constructor(id: string) {
    this.containerId = document.getElementById(id);
  }
}

export { Viewer };
