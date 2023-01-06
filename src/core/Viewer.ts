/*
 * @Description:Viewer类
 * @Author: yangsen
 * @Date: 2022-12-19 10:38:45
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-06 18:50:41
 */

import { Scene } from './Scene';
import { PointLight } from '../lights/PointLight';
import { initRender } from '../common/render';
import { OrbitControls } from '../annex/OrbitControls';
import { WebGLRenderer } from '../renderers/WebglRenderer';
class Viewer {
  container: HTMLElement | null;

  constructor(id: string) {
    this.container = document.getElementById(id);
    this.initScene();
    if (this.container !== null) {
      // 初始化渲染器
      initRender(this.renderer, this.scene, this.camera, this.container);
    } else {
      throw '不能根据id获取到正确的DOM元素';
    }
    // 视锥控制
    new OrbitControls(this.camera, this.renderer.domElement).addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera);
    });
  }

  private renderer = new WebGLRenderer();
  scene = new Scene();
  pointLight = new PointLight();
  camera = this.scene.camera;

  /* 初始化场景 */
  initScene() {
    this.pointLight.position.set(10, 10, 10);
    this.scene.add(this.pointLight);
    this.camera.position.set(70, 70, 70);
    this.camera.lookAt(this.scene.position);
  }

  /* 渲染函数 */
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export { Viewer };
