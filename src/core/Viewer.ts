/*
 * @Description: Viewer类
 * @Author: yangsen
 * @Date: 2022-12-19 10:38:45
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-10 21:28:39
 */

import { Scene } from './Scene';
import { initRender, composerRenderLoop } from '../common/render';
import { OrbitControls } from '../annex/OrbitControls';
import { WebGLRenderer } from '../renderers/WebglRenderer';
import { EntityGroup } from '../entity/EntityGroup';
import { AxesHelper } from '../helper/AxesHelper';
import { Vector2 } from '../math/Vector2';
import { Vector3 } from '../math/Vector3';
import { Box3 } from '../math/Box3';
import { Raycaster } from '../basics/Raycaster';
import { MeshBasicMaterial } from '../material/MeshBasicMaterial';
import { Mesh } from '../mesh/Mesh';
import { PlaneGeometry } from '../geometries/PlaneGeometry';
import { Color } from '../math/Color';
import { CubeTextureLoader } from '../loader/CubeTextureLoader';
import type { Sources } from '@/typings/index';
import { getJpgUrl, arrMaxNum } from '@/utils/utilFunction';
import { Tween, Easing } from '@tweenjs/tween.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { SphereGeometry } from 'three';
import { primitiveArr } from '@/primitive/PrimitiveGroup';

const scene = new Scene();
const renderer = new WebGLRenderer();
const composer = new EffectComposer(renderer); // 初始化效果组合器,后期处理
// 添加基本的渲染通道
const renderPass = new RenderPass(scene, scene.camera);
composer.addPass(renderPass);
// OutlinePass通道可以为场景中被添加到通道中的物体边缘添加一个描边发光效果。
const outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, scene.camera);
outlinePass.visibleEdgeColor.set('#b5005e'); // 边缘可见部分发光颜色，默认 #FFFFFF。
outlinePass.hiddenEdgeColor.set('#b50003'); // 边缘遮挡部分发光颜色，默认 #190A05。
outlinePass.edgeStrength = 5; // 边缘强度 ，默认 3.0
outlinePass.edgeThickness = 3; // 边缘厚度，默认 1.0
outlinePass.edgeGlow = 1; // 边缘流， 默认 0.0
outlinePass.pulsePeriod = 2; // 闪烁频率 ，默认 0，值越大频率越低。
composer.addPass(outlinePass);
// 视锥控制
scene.camera.up.set(0, 0, 1);
// scene.camera.position.set(0, -10, 0);
const controls = new OrbitControls(scene.camera, renderer.domElement);
controls.addEventListener('change', () => {
  // renderer.render(scene, scene.camera);
  composer.render();
});

class Viewer {
  container: HTMLElement | null;

  constructor(id: string) {
    this.container = document.getElementById(id);
    this.initScene();
    // 初始向scene中添加图元组
    this.scene.add(this.scene.primitives);
    this.setSkyBox(); // 设置天空盒

    if (this.container !== null) {
      this.scene.camera.up.set(0, 0, 1);
      // 初始化渲染器
      initRender(this.renderer, this.scene, this.camera, this.container);
    } else {
      throw new Error('不能根据id获取到正确的DOM元素');
    }

    // 循环更新渲染
    composerRenderLoop();
  }

  private renderer = renderer;
  scene = scene;
  camera = this.scene.camera;
  entities = new EntityGroup();
  _axesShow = true;
  _axesLength = 10;
  _groundColor = new Color(87, 96, 111);
  // 场景中增加一个地面
  private groundGeometry = new PlaneGeometry(1000, 1000);
  private groundMaterial = new MeshBasicMaterial({ color: this._groundColor, side: 2, transparent: true });
  private ground = new Mesh(this.groundGeometry, this.groundMaterial);
  private axesHelper = new AxesHelper(this._axesLength);

  /* 初始化场景 */
  private initScene() {
    this.ground.name = 'ground';
    this.ground.position.set(0, 0, -1);
    this.scene.add(this.ground);
    this.scene.light.position.set(1, 1, 1);
    this.scene.add(this.scene.light);
    if (this._axesShow) this.scene.add(this.axesHelper);
    this.scene.camera.position.set(70, 70, 70);
    this.scene.camera.lookAt(this.scene.position);
  }
  get groundColor() {
    return this._groundColor;
  }
  set groundColor(value: Color) {
    this.ground.material.color = value;
    this.ground.material.opacity = value.alpha;
  }
  get axesShow() {
    return this._axesShow;
  }
  set axesShow(value: boolean) {
    this.axesHelper.visible = value;
    this._axesShow = value;
  }
  get axesLength() {
    return this._axesLength;
  }
  set axesLength(value: number) {
    this.axesHelper.scale.set(value / this._axesLength, value / this._axesLength, value / this._axesLength);
    this._axesLength = value;
  }

  /* 设置天空盒 */
  private skyBoxSource: Sources = {
    px: getJpgUrl('textures/skyBox/tycho2t3_80_px'),
    mx: getJpgUrl('textures/skyBox/tycho2t3_80_mx'),
    py: getJpgUrl('textures/skyBox/tycho2t3_80_py'),
    my: getJpgUrl('textures/skyBox/tycho2t3_80_my'),
    pz: getJpgUrl('textures/skyBox/tycho2t3_80_pz'),
    mz: getJpgUrl('textures/skyBox/tycho2t3_80_mz'),
  };
  setSkyBox(source: Sources = this.skyBoxSource, show: boolean = true) {
    const loader = new CubeTextureLoader();
    const texture = loader.load([source.px, source.mx, source.py, source.my, source.pz, source.mz]);
    if (show) {
      this.scene.background = texture;
    } else {
      this.scene.background = null;
    }
  }

  /* 拾取物体，返回包含所有物体的数组 */
  drillPick(position: Vector2) {
    const windowPosition = new Vector2();
    windowPosition.x = (position.x / window.innerWidth) * 2 - 1;
    windowPosition.y = -(position.y / window.innerHeight) * 2 + 1;
    const raycaster = new Raycaster();
    raycaster.setFromCamera(windowPosition, this.scene.camera);
    const objArr = raycaster.intersectObject(this.scene).map((item) => item.object);
    // @ts-ignore
    const allowSelect = objArr.filter((item) => item.select === true);
    const primitives = allowSelect.map((item) => {
      const primitive = primitiveArr.find((value: any) => value.id === item.name);
      return primitive;
    });
    const result = primitives.length === 0 ? null : primitives;
    return result;
  }

  /* 拾取图元，返回第一个图元 */
  pick(position: Vector2) {
    const windowPosition = new Vector2();
    windowPosition.x = (position.x / window.innerWidth) * 2 - 1;
    windowPosition.y = -(position.y / window.innerHeight) * 2 + 1;
    const raycaster = new Raycaster();
    raycaster.setFromCamera(windowPosition, this.scene.camera);
    const objArr = raycaster.intersectObject(this.scene).map((item) => item.object);
    // @ts-ignore
    const allowSelect = objArr.filter((item) => item.select === true);
    const primitives = allowSelect.map((item) => {
      const primitive = primitiveArr.find((value: any) => value.id === item.name);
      return primitive;
    });
    const result = primitives.length === 0 ? null : primitives[0];
    return result;
  }

  /* 获取物体上的点 */
  pickPosition(windowPosition: Vector2): null | Vector3 {
    const position = new Vector2();
    if (this.container !== null) {
      position.x = (windowPosition.x / this.container.clientWidth) * 2 - 1;
      position.y = -(windowPosition.y / this.container.clientHeight) * 2 + 1;
    }

    const raycaster = new Raycaster();
    raycaster.setFromCamera(position, this.scene.camera);

    const objArr = raycaster.intersectObject(this.scene, true);

    const point = objArr[0].point;
    return point === undefined ? null : point;
  }

  /* 相机飞行,第一个参数是相机要飞行到的目标对象 */
  flyTo(result: any, options?: { startTarget?: any; during?: number; mode?: string }) {
    const object = this.scene.getObjectByName(result.id);
    const box3 = new Box3();
    if (object === undefined) {
      throw new Error('传入的primitive不正确');
    } else {
      box3.setFromObject(object);
      // @ts-ignore
      const objPosition = box3.getCenter(box3.min, box3.max);
      let current: any;
      if (options?.startTarget === undefined) {
        current = {
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z,
          x1: controls.target.x,
          y1: controls.target.y,
          z1: controls.target.z,
        };
      } else {
        /* 如果指定startTarget，可以不是从当前相机看向的物体开始飞行 */
        current = {
          x: options?.startTarget.x + 3,
          y: options?.startTarget.y + 3,
          z: options?.startTarget.z + 15,
          x1: options?.startTarget.x,
          y1: options?.startTarget.y,
          z1: options?.startTarget.z,
        };
      }

      const destination = {
        x: objPosition.x + 3,
        y: objPosition.y + 3,
        z: objPosition.z + 15,
        x1: objPosition.x,
        y1: objPosition.y,
        z1: objPosition.z,
      };
      const tween = new Tween(current);
      /* let mode;
      switch (options?.mode) {
        case:"Linear.None"
      } */
      tween.easing(Easing.Quadratic.InOut);
      tween.onComplete(() => {
        const temp = new Vector3(destination.x1, destination.y1, destination.z1);
        controls.target = temp;
      });
      tween.onUpdate(() => {
        this.camera.position.set(current.x, current.y, current.z);
        this.camera.lookAt(current.x1, current.y1, current.z1);
      });

      tween.to(destination, options?.during === undefined ? 1000 : options?.during);
      tween.start();
    }
  }

  // 图元高亮效果
  highLight(primitives: any) {
    if (!(primitives instanceof Array)) {
      console.error('高亮图元参数应为数组');
    }
    const objectArr = primitives.map((item: any) => {
      return this.scene.getObjectByName(item.id);
    });
    const spriteArr = [];
    const pointsArr = [];
    const outlineArr: any[] = [];

    objectArr.forEach((item: any) => {
      if (item.type === 'Sprite') {
        spriteArr.push(item);
        const scale = item.scale;
        const maxScale = arrMaxNum([scale.x, scale.y, scale.z]);
        const cylinderGeometry = new SphereGeometry(maxScale);
        const cylinderMaterial = new MeshBasicMaterial({
          color: '#ff0004',
          transparent: true,
          opacity: 0.3,
        });
        const cylinder = new Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.position.set(item.position.x, item.position.y, item.position.z);
        this.scene.add(cylinder);
      } else if (item.type === 'Points') {
        pointsArr.push(item);
        const size = item.material.size;
        const cylinderGeometry = new SphereGeometry(size);
        const cylinderMaterial = new MeshBasicMaterial({
          color: '#ff0004',
          transparent: true,
          opacity: 0.3,
        });
        const cylinder = new Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.position.set(
          item.geometry.attributes.position.array[0],
          item.geometry.attributes.position.array[1],
          item.geometry.attributes.position.array[2],
        );
        this.scene.add(cylinder);
      } else {
        outlineArr.push(item);
      }
    });

    outlinePass.selectedObjects = outlineArr;
  }
}

export { Viewer, scene, renderer, controls, composer };
