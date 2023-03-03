/*
 * @Description: 图元组
 * @Author: yangsen
 * @Date: 2023-01-05 18:21:33
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-03 15:38:11
 */
import { Object3D, Mesh, Points, Sprite } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { GLTFLoader } from '../loader/GLTFLoader';
class PrimitiveGroup extends Object3D {
  type: string;
  constructor() {
    super();
    this.type = 'primitiveGroup';
  }
  private primitiveArr: any = [];

  append(obj: any) {
    this.primitiveArr.push(obj);
    /* PrimitiveGroup中既可以添加primitive又可添加自身 */
    if (obj.type === 'primitiveGroup') {
      this.primitiveArr.forEach((item: any) => {
        this.appendFun(obj);
      });
    } else if (obj.type === 'primitive') {
      this.appendFun(obj);
    }
  }

  getById(id: string) {
    const primitive = this.primitiveArr.find((item: any) => item.id === id);
    return primitive;
  }
  private appendFun(obj: any, children = this.children) {
    // children是继承自Object3D属性
    const geometryInstance = obj.geometryInstance;
    const scale = geometryInstance.scale;
    const translate = geometryInstance.translate;
    const rotation = geometryInstance.rotation;
    const heading = geometryInstance.heading;
    const pitch = geometryInstance.pitch;
    const roll = geometryInstance.roll;
    const geometry = geometryInstance.geometry;
    const materialAppearance = obj.appearance; // MaterialAppearance层级
    const show = obj.show;
    const select = obj.select;
    const material = materialAppearance.material;
    material.material.visible = show;
    if (geometry.type === 'modelGeometry') {
      const loader = new GLTFLoader();
      loader.load(
        material.url,
        // 加载成功
        function (gltf) {
          geometryInstance.geometry.isModelReady = true;
          // gis场景Z轴朝上，所以改变了camera的up属性；但是gltf格式还是Y轴向上，要经过旋转适配。
          // gltf.scene.rotateX(-Math.PI / 2);
          gltf.scene.rotateZ(-Math.PI);
          gltf.scene.position.set(geometry.position.x, geometry.position.y, geometry.position.z);
          gltf.scene.name = obj.id;
          // @ts-ignore
          gltf.select = select;
          gltf.scene.scale.set(scale.x, scale.y, scale.z);
          gltf.scene.translateX(translate.x);
          gltf.scene.translateY(translate.y);
          gltf.scene.translateZ(translate.z);
          gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
          gltf.scene.rotateZ(heading);
          gltf.scene.rotateX(pitch);
          gltf.scene.rotateY(roll);
          children.push(gltf.scene);
        },
        // 模型加载中
        function () {},
        // 加载出错
        function (error) {
          console.error(error);
        },
      );
    } else if (geometry.type === 'line2') {
      /* 线 */
      material.material.visible = show;
      const line2 = new Line2(geometry.geometry, material.material);
      line2.name = obj.id;
      // @ts-ignore
      line2.select = select;
      line2.scale.set(scale.x, scale.y, scale.z);
      line2.translateX(translate.x);
      line2.translateY(translate.y);
      line2.translateZ(translate.z);
      line2.rotation.set(rotation.x, rotation.y, rotation.z);
      line2.rotateZ(heading);
      line2.rotateX(pitch);
      line2.rotateY(roll);
      children.push(line2);
    } else if (geometry.type === 'pointGeometry') {
      /* 点 */
      material.material.visible = show;
      const point = new Points(geometry.geometry, material.material);
      point.name = obj.id;
      // @ts-ignore
      point.select = select;
      point.scale.set(scale.x, scale.y, scale.z);
      point.translateX(translate.x);
      point.translateY(translate.y);
      point.translateZ(translate.z);
      children.push(point);
    } else if (geometry.type === 'labelGeometry') {
      /* 文字 */
      material.material.visible = show;
      const label = new Sprite(material.material);
      label.name = obj.id;
      // @ts-ignore
      label.select = select;
      const position = geometry.position;
      label.position.set(position.x, position.y, position.z);
      label.scale.set(scale.x, scale.y, scale.z);
      label.translateX(translate.x);
      label.translateY(translate.y);
      label.translateZ(translate.z);
      children.push(label);
    } else if (geometry.type === 'billboardGeometry') {
      /* 广告牌 */
      material.material.visible = show;
      const billboard = new Sprite(material.material);
      billboard.name = obj.id;
      // @ts-ignore
      billboard.select = select;
      const position = geometry.position;
      billboard.position.set(position.x, position.y, position.z);
      billboard.scale.set(scale.x, scale.y, scale.z);
      billboard.translateX(translate.x);
      billboard.translateY(translate.y);
      billboard.translateZ(translate.z);
      children.push(billboard);
    } else {
      /* mesh */
      material.material.visible = show;
      const mesh = new Mesh(geometry.geometry, material.material);
      mesh.scale.set(scale.x, scale.y, scale.z);
      mesh.translateX(translate.x);
      mesh.translateY(translate.y);
      mesh.translateZ(translate.z);
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
      mesh.rotateZ(heading);
      mesh.rotateX(pitch);
      mesh.rotateY(roll);
      mesh.name = obj.id;
      // @ts-ignore
      mesh.select = select;
      children.push(mesh);
    }
  }
}

export { PrimitiveGroup };
