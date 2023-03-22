import { WebGLRenderer } from '../renderers/WebglRenderer';
import { Color } from '../math/Color';
import { renderer, scene, composer, labelRenderer } from '../core/Viewer';
import { camera } from '../core/Scene';
import { update } from '@tweenjs/tween.js';

export const initRender = (renderer: WebGLRenderer, container: HTMLElement) => {
  // 渲染器配置
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(new Color(223, 230, 233), 1);
  // 渲染到页面
  container.appendChild(renderer.domElement);

  /* CSS2D渲染器 */
  labelRenderer.setSize(container.clientWidth, container.clientHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  document.body.appendChild(labelRenderer.domElement);
};

export const loopRender = () => {
  renderer.render(scene, camera);
  update();
  requestAnimationFrame(loopRender);
};

export const composerRenderLoop = () => {
  // 告诉composer适配画布大小，不然会出现图形模糊的情况
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.render();
  update();
  requestAnimationFrame(composerRenderLoop);
};
