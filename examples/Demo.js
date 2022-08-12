import * as WEBGIS from '../build/bundle.module.js';

let Model;

// 场景
const scene = new WEBGIS.Scene();
// 渲染器
const renderer = new WEBGIS.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new WEBGIS.Color(0x08c924), 1);
// 相机
const camera = new WEBGIS.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(100, 100, 100);

// 灯光
const light = new WEBGIS.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
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

// glb模型加载
const loader = new WEBGIS.GLTFLoader();
loader.load('./assets/housePlayground.glb', function (glb) {
  Model = glb.scene;
  scene.add(Model);
  renderer.render(scene, camera);
});

// AxesHelper辅助对象
const axes = new WEBGIS.AxesHelper(10);
scene.add(axes);

// 添加点
const point = new WEBGIS.PointSymbol();
scene.add(point);

// 渲染到页面
document.getElementById('webgl-output').appendChild(renderer.domElement);
// 辅助控制器
const controls = new WEBGIS.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
  renderer.render(scene, camera);
});
