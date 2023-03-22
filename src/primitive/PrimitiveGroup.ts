/*
 * @Description: 图元组
 * @Author: yangsen
 * @Date: 2023-01-05 18:21:33
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-22 11:03:19
 */
import { Object3D, Mesh, Points, Sprite } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { GLTFLoader } from '../loader/GLTFLoader';
export const primitiveArr: any = [];

class PrimitiveGroup extends Object3D {
  type: string;
  constructor() {
    super();
    this.type = 'primitiveGroup';
  }

  append(obj: any) {
    primitiveArr.push(obj);
    /* PrimitiveGroup中既可以添加primitive又可添加自身 */
    if (obj.type === 'primitiveGroup') {
      primitiveArr.forEach((item: any) => {
        this.appendFun(obj);
      });
    } else if (obj.type === 'primitive') {
      this.appendFun(obj);
    }
  }

  private appendFun(obj: any, children = this.children) {
    // children是继承自Object3D属性
    const geometryInstances = obj.geometryInstances;
    const scale = geometryInstances.scale;
    const translate = geometryInstances.translate;
    const rotation = geometryInstances.rotation;
    const heading = geometryInstances.heading;
    const pitch = geometryInstances.pitch;
    const roll = geometryInstances.roll;
    const matrix = geometryInstances.matrix;
    const geometry = geometryInstances.geometry;
    const materialAppearance = obj.appearance; // MaterialAppearance层级
    const show = obj.show;
    const select = obj.select;
    const material = materialAppearance.material;
    if (geometry.type === 'modelGeometry') {
      const loader = new GLTFLoader();
      loader.load(
        material.url,
        // 加载成功
        function (gltf) {
          geometryInstances.geometry.isModelReady = true;
          gltf.scene.visible = show;
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
          if (matrix !== undefined) {
            gltf.scene.applyMatrix4(matrix);
          }
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
      line2.visible = show;
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
      point.visible = show;
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
      console.log(material.material.map);
      label.visible = show;
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
      const billboard = new Sprite(material.material); // 广告牌图片部分
      billboard.visible = show;
      billboard.name = obj.id;
      // @ts-ignore
      billboard.select = select;
      const billboardText = new Sprite(material.textMaterial.material); // 广告牌文字部分
      billboardText.visible = show;
      // @ts-ignore
      billboardText.select = select;
      const position = geometry.position;
      billboard.position.set(position.x, position.y, position.z);
      billboard.scale.set(scale.x, scale.y, scale.z);
      billboard.translateX(translate.x);
      billboard.translateY(translate.y);
      billboard.translateZ(translate.z);
      if (matrix !== undefined) {
        billboard.applyMatrix4(matrix);
      }
      console.log(material.textMaterial.material.map);
      billboardText.position.set(position.x, position.y, position.z);
      billboardText.scale.set(scale.x, scale.y, scale.z);
      billboardText.translateX(translate.x);
      billboardText.translateY(translate.y);
      billboardText.translateZ(translate.z - billboard.scale.z - billboardText.scale.z / 2);
      children.push(billboard);
      children.push(billboardText);
    } else {
      /* mesh */
      material.material.visible = show;
      const mesh = new Mesh(geometry.geometry, material.material);
      mesh.visible = show;
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
