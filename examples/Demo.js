import * as WEBGIS from '../build/bundle.module.js';
import { pointFun, pointPickupFun, seriesPointsFun, selectPointFun } from './point.js';
import { gui, dynamicFlag, _getPositionVisible } from './lil-gui.js';
import { selectBoxFun } from './box.js';

export let Model,
  scene,
  camera,
  renderer,
  clock,
  pointer,
  raycaster,
  intersection,
  screenPosition,
  container,
  _getPointPosition;
let toggle = 0;
let threshold = 0.1;
let pointIndex = 0;

const seriesPoints = seriesPointsFun();

// 单独获取点击坐标
const getPosition = (event) => {
  const pointer = new WEBGIS.Vector2();
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersections = raycaster.intersectObject(Model.children[2], true);

  const intersection = intersections.length > 0 ? intersections[0] : null;
  if (intersection) _getPointPosition = intersection.point;

  
  if (_getPositionVisible) {
    const point = new WEBGIS.PointSymbol();
    point.position.set(_getPointPosition.x, _getPointPosition.y + 1, _getPointPosition.z);
    scene.add(point);
    renderer.render(scene, camera);
  }
};

// mousemove事件
const onMouseMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
};
// 初始化函数
const init = () => {
  // 场景
  scene = new WEBGIS.Scene();
  // 渲染器
  renderer = new WEBGIS.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new WEBGIS.Color(0x08c924), 1);
  // 相机
  camera = new WEBGIS.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(70, 70, 70);
  // 灯光
  const light = new WEBGIS.DirectionalLight(0xffffff, 1);
  light.position.set(100, 100, 100);
  scene.add(light);
  const pointLight = new WEBGIS.PointLight();
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);
  const pointLight2 = new WEBGIS.PointLight();
  pointLight2.position.set(-20, 20, 20);
  scene.add(pointLight2);
  const pointLight3 = new WEBGIS.PointLight();
  pointLight3.position.set(-100, -50, 20);
  scene.add(pointLight3);
  const pointLight4 = new WEBGIS.PointLight();
  pointLight4.position.set(-100, 0, 20);
  scene.add(pointLight4);
  const pointLight5 = new WEBGIS.PointLight();
  pointLight5.position.set(10, -50, 20);
  scene.add(pointLight5);
  // 时钟
  clock = new WEBGIS.Clock();
  // 鼠标位置点
  pointer = new WEBGIS.Vector2();
  // AxesHelper辅助对象
  const axes = new WEBGIS.AxesHelper(10);
  scene.add(axes);

  // Raycaster
  raycaster = new WEBGIS.Raycaster();
  raycaster.params.Points.threshold = threshold;

  /* // 添加纹理文字
  scene.add(textureText()); */

  renderer.render(scene, camera);

  container = document.getElementById('webgl-output');
  // 渲染到页面
  container.appendChild(renderer.domElement);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('dblclick', pointPickupFun);
  container.addEventListener('mousedown', selectPointFun);
  container.addEventListener('mousedown', selectBoxFun);
  container.addEventListener('mouseup', getPosition);
};

// render函数
const render = () => {
  if (dynamicFlag === true) {
    raycaster.setFromCamera(pointer, camera);

    const intersections = raycaster.intersectObject(Model.children[2], true);

    intersection = intersections.length > 0 ? intersections[0] : null;
    if (toggle > 0.02 && intersection !== null) {
      seriesPoints[pointIndex].position.set(
        intersection.point.x + 1,
        intersection.point.y + 1,
        intersection.point.z + 1,
      );
      seriesPoints[pointIndex].setSize(4);
      pointIndex = (pointIndex + 1) % seriesPoints.length;
      toggle = 0;
    }
    for (let i = 0; i < seriesPoints.length; i++) {
      const point = seriesPoints[i];
      if (point.getSize() < 0.1) {
        point.setSize(0);
        point.setOpacity(0);
      } else {
        point.setOpacity(1);
        point.setSize(point.getSize() * 0.9);
      }
      scene.add(point);
    }
  }

  toggle += clock.getDelta();
  renderer.render(scene, camera);
};

// 动画函数
const animation = () => {
  requestAnimationFrame(animation);
  render();
};

const glb = () => {
  // glb模型加载
  const loader = new WEBGIS.GLTFLoader();
  loader.load('./assets/housePlayground.glb', function (glb) {
    console.log(glb);
    Model = glb.scene;

    Model.scale.set(1.5, 1.5, 1.5);

    // 将模型缩放，并将模型的几何中心点移动到原点
    /* Model.scale.set(0.01, 0.01, 0.01);
    Model.rotateX(Math.PI / 2);
    const box3 = new WEBGIS.Box3().setFromObject(Model);
    var mdlen = box3.max.x - box3.min.x;
    var mdwid = box3.max.z - box3.min.z;
    var mdhei = box3.max.y - box3.min.y;
    //var centerpoint = new THREE.Vector3();
    var x1 = box3.min.x + mdlen / 2;
    var y1 = box3.min.y + mdhei / 2;
    var z1 = box3.min.z + mdwid / 2;
    Model.position.set(-x1, -y1, -z1); */

    /* const boxHelper = new WEBGIS.BoxHelper(Model);
    scene.add(boxHelper); */

    scene.add(Model);
    renderer.render(scene, camera);
    animation();
  });
};
init();

glb();
// 辅助控制器
const controls = new WEBGIS.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
  renderer.render(scene, camera);
});
