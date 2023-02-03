/*
 * @Description: Viewer类
 * @Author: yangsen
 * @Date: 2022-12-19 10:38:45
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-31 10:58:23
 */

import { Scene } from './Scene';
import { initRender, loopRender } from '../common/render';
import { OrbitControls } from '../annex/OrbitControls';
import { WebGLRenderer } from '../renderers/WebglRenderer';
import { EntityGroup } from '../entity/EntityGroup';
import { AxesHelper } from '../helper/AxesHelper';
import type { Object3D } from 'three';
import { Vector2 } from '../math/Vector2';
import { Vector3 } from '../math/Vector3';
import { Raycaster } from '../basics/Raycaster';
import { MeshBasicMaterial } from '../material/MeshBasicMaterial';
import { Mesh } from '../mesh/Mesh';
import { PlaneGeometry } from '../geometries/PlaneGeometry';
import { Color } from '../math/Color';
import { CubeTextureLoader } from '../loader/CubeTextureLoader';
import type { Sources } from '@/typings/index';
import { getJpgUrl } from '@/utils/utilFunction';

const scene = new Scene();
const renderer = new WebGLRenderer();

class Viewer {
  container: HTMLElement | null;

  constructor(id: string) {
    this.container = document.getElementById(id);
    this.initScene();
    // 初始向scene中添加图元组
    this.scene.add(this.scene.primitives);
    this.setSkyBox(); // 设置天空盒

    if (this.container !== null) {
      // 初始化渲染器
      initRender(this.renderer, this.scene, this.scene.camera, this.container);
    } else {
      throw new Error('不能根据id获取到正确的DOM元素');
    }

    // 视锥控制
    new OrbitControls(this.scene.camera, this.renderer.domElement).addEventListener('change', () => {
      this.renderer.render(this.scene, this.scene.camera);
    });

    // 循环更新渲染
    loopRender();
  }

  renderer = renderer;
  scene = scene;
  entities = new EntityGroup();
  axes = true;

  /* 监听entities的add方法：调用add方法时，通过scene.primitives.add添加图元，完成实体向图元的转换 */

  /* 初始化场景 */
  initScene() {
    // 场景中增加一个很大的地面
    const groundGeometry = new PlaneGeometry(1000, 1000);
    const material = new MeshBasicMaterial({ color: new Color(206, 214, 224), side: 2 });
    const ground = new Mesh(groundGeometry, material);
    ground.name = 'ground';
    ground.position.set(0, -1, 0);
    this.scene.add(ground);
    this.scene.light.position.set(1, 1, 1);
    this.scene.add(this.scene.light);
    const axesHelper = new AxesHelper(10);
    if (this.axes) this.scene.add(axesHelper);
    this.scene.camera.position.set(70, 70, 70);
    this.scene.camera.lookAt(this.scene.position);
    this.scene.camera.up.set(0, 0, 1);
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
    this.scene.background = texture;
  }

  /* 根据图元名称获取图元 */
  getPrimitiveByName(name: string): undefined | Object3D {
    const object = this.scene.getObjectByName(name);
    return object;
  }

  drillPick(position: Vector2, objects: Object3D[], recursive?: boolean) {
    const windowPosition = new Vector2();
    windowPosition.x = (position.x / window.innerWidth) * 2 - 1;
    windowPosition.y = -(position.y / window.innerHeight) * 2 + 1;
    const raycaster = new Raycaster();
    raycaster.setFromCamera(windowPosition, this.scene.camera);
    const containChild = recursive === undefined ? true : recursive;
    const objArr = raycaster.intersectObjects(objects, containChild);
    return objArr;
  }

  pick(position: Vector2, object: Object3D, recursive?: boolean) {
    const windowPosition = new Vector2();
    windowPosition.x = (position.x / window.innerWidth) * 2 - 1;
    windowPosition.y = -(position.y / window.innerHeight) * 2 + 1;
    const raycaster = new Raycaster();
    raycaster.setFromCamera(windowPosition, this.scene.camera);
    const containChild = recursive === undefined ? true : recursive;
    const objArr = raycaster.intersectObject(object, containChild);
    return objArr;
  }

  /* 获取物体上的点 */
  pickPosition(windowPosition: Vector2): undefined | Vector3 {
    const position = new Vector2();
    if (this.container !== null) {
      position.x = (windowPosition.x / this.container.clientWidth) * 2 - 1;
      position.y = -(windowPosition.y / this.container.clientHeight) * 2 + 1;
    }

    const raycaster = new Raycaster();
    raycaster.setFromCamera(position, this.scene.camera);

    const objArr = raycaster.intersectObject(this.scene, true);

    const point = objArr[0].point;
    return point === undefined ? undefined : point;
  }
}

export { Viewer, scene, renderer };
