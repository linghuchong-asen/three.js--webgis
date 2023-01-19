import { WebGLRenderer } from '../renderers/WebglRenderer';
import type { Scene, Camera } from 'three';
import { Color } from '../math/Color';
import { renderer, scene } from '../core/Viewer';
import { camera } from '../core/Scene';

export const initRender = (renderer: WebGLRenderer, scene: Scene, camera: Camera, container: HTMLElement) => {
  // 渲染器配置
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new Color(223, 230, 233), 1);
  renderer.render(scene, camera);

  // 渲染到页面
  container.appendChild(renderer.domElement);
};

export const loopRender = () => {
  requestAnimationFrame(loopRender);
  renderer.render(scene, camera);
};
