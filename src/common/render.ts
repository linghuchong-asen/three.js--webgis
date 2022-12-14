import { WebGLRenderer } from '../renderers/WebglRenderer';
import type { Scene, Camera } from 'three';
import { Color } from '../math/Color';

export const initRender = (renderer: WebGLRenderer, scene: Scene, camera: Camera, container: HTMLElement) => {
  // 渲染器配置
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new Color(0xdfe6e9), 1);
  renderer.render(scene, camera);

  // 渲染到页面
  container.appendChild(renderer.domElement);
};
