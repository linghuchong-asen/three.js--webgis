/*
 * @Description: 图元组
 * @Author: yangsen
 * @Date: 2023-01-05 18:21:33
 * @LastEditors: yangsen
 * @LastEditTime: 2023-02-08 15:51:12
 */
import { Object3D, Mesh, Points } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { GLTFLoader } from '../loader/GLTFLoader';
class PrimitiveGroup extends Object3D {
  type: string;
  constructor() {
    super();
    this.type = 'Group';
  }

  append(obj: any, children = this.children) {
    // children是继承自Object3D属性
    if (obj.type === 'model') {
      const loader = new GLTFLoader();
      loader.load(
        obj.url,
        // 加载成功
        function (gltf) {
          if (obj.name !== '') {
            gltf.scene.name = obj.name;
          }
          obj.isModelReady = true;
          // gis场景Z轴朝上，所以改变了camera的up属性；但是gltf格式还是Y轴向上，要经过旋转适配。
          gltf.scene.rotateX(-Math.PI / 2);
          gltf.scene.rotateZ(-Math.PI);
          gltf.scene.position.set(obj.position.x, obj.position.y, obj.position.z);
          children.push(gltf.scene);
        },
        // 模型加载中
        function () {},
        // 加载出错
        function (error) {
          console.error(error);
        },
      );
    } else {
      const geometry = obj.geometry.geometry;
      const material = obj.material;

      if (obj.geometry.type === 'line2') {
        const line2 = new Line2(geometry, material);

        // line2.rotateY(Math.PI);
        children.push(line2);
      } else if (obj.geometry.type === 'pointGeometry') {
        const point = new Points(geometry, material);
        children.push(point)
      } else {
        console.log(geometry);
        const mesh = new Mesh(geometry, material);
        // mesh.rotateY(Math.PI);
        children.push(mesh);
      }

      // mesh.translateZ(-100);

      /* children.push(obj.geometry.outline);
      if (obj.geometry.openFluidWll === true) {
        children.push(obj.geometry.wall);
      } */
    }
  }
}
export { PrimitiveGroup };
