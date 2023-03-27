/*
 * @Description: 图元组
 * @Author: yangsen
 * @Date: 2023-01-05 18:21:33
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-27 11:19:54
 */
import { Object3D, Mesh, Points, Sprite, Vector3, Box3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { GLTFLoader } from '../loader/GLTFLoader';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { createCanvas, createPolygonCanvas } from '@/common/canvasText';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
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
          gltf.scene.position.set(
            geometry.position.x,
            geometry.position.y,
            geometry.position.z,
          );
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
      label.visible = false;
      label.name = obj.id;
      // @ts-ignore
      label.select = select;
      const position = geometry.position;
      label.position.set(position.x, position.y, position.z);
      label.scale.set(scale.x, scale.y, scale.z);
      label.translateX(translate.x);
      label.translateY(translate.y);
      label.translateZ(translate.z);
      const textDiv = document.createElement('div');
      textDiv.appendChild(
        createCanvas({
          text: material.text,
          fontSize: material.fontSize,
          fillColor: material.fillColor,
          outlineColor: material.outlineColor,
          isFill: material.isFill,
          isOutline: material.isOutline,
          outlineWidth: material.outlineWidth,
          fontScale: scale.x,
        }),
      );
      const text2D = new CSS2DObject(textDiv);
      text2D.position.set(0, 0, 0);
      label.add(text2D);
      children.push(label);
    } else if (geometry.type === 'billboardGeometry') {
      /* 广告牌 */
      material.material.visible = show;
      const billboard = new Sprite(material.material); // 广告牌图片部分
      billboard.visible = false;
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

      // 使用CSS2D渲染广告牌内容
      const billboardDiv = document.createElement('div');
      const pictureDiv = document.createElement('div');
      billboardDiv.appendChild(pictureDiv);
      pictureDiv.style.backgroundImage = `url(${material.image})`;
      pictureDiv.style.backgroundRepeat = 'no-repeat';
      pictureDiv.style.backgroundSize = 'cover';
      pictureDiv.style.backgroundPosition = 'center center';
      pictureDiv.style.height = `${48 * scale.x}px`;
      pictureDiv.style.width = `${48 * scale.y}px`;
      pictureDiv.style.margin = '0 auto';
      billboardDiv.appendChild(
        createCanvas({
          text: material.text,
          fontSize: material.textFontSize,
          fillColor: material.textFillColor,
          outlineColor: material.textOutlineColor,
          isFill: material.textIsFill,
          isOutline: material.textIsOutline,
          outlineWidth: material.textOutlineWidth,
          fontScale: scale.x,
        }),
      );

      const billboardLabel = new CSS2DObject(billboardDiv);
      billboardLabel.position.set(0, 0, 0);
      billboard.add(billboardLabel);
      children.push(billboard);
    } else if (geometry.type === 'polygonGeometry') {
      /* 多边形区域 */
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
      // 边框线
      const positionTop: Vector3[] = geometry.positionArrTranslate;
      const positionBottom: Vector3[] = geometry.positionArr;
      const topArr: number[] = []; // 顶面line2的参数
      const lineTopGeometry = new LineGeometry();
      positionTop.forEach((item: Vector3, index: number) => {
        topArr.push(item.x);
        topArr.push(item.y);
        topArr.push(item.z);
        if (index === positionTop.length - 1) {
          topArr.push(positionTop[0].x);
          topArr.push(positionTop[0].y);
          topArr.push(positionTop[0].z);
        }
      });
      lineTopGeometry.setPositions(topArr);
      const aroundArr: number[][] = []; // 四周line2参数
      const lineAround: LineGeometry[] = [];
      positionTop.forEach((item: Vector3, index: number) => {
        aroundArr[index] = [
          item.x,
          item.y,
          item.z,
          positionBottom[index].x,
          positionBottom[index].y,
          positionBottom[index].z,
        ];
      });
      aroundArr.forEach((item: number[], index: number) => {
        lineAround[index] = new LineGeometry();
        lineAround[index].setPositions(item);
      });
      const lineMaterial = material.outlineMaterial.material;
      const lineTop = new Line2(lineTopGeometry, lineMaterial);
      children.push(lineTop);
      lineAround.forEach((item, index) => {
        const line2 = new Line2(item, lineMaterial);
        children.push(line2);
      });
      // 文字
      const box3 = new Box3();
      box3.setFromPoints(positionTop);
      const textPosition = new Vector3();
      box3.getCenter(textPosition);
      const text = new Sprite(material.textMaterial.material);
      text.visible = false;
      // @ts-ignore
      text.select = select;
      text.position.set(textPosition.x, textPosition.y, textPosition.z - 1);
      text.scale.set(scale.x, scale.y, scale.z);
      text.translateX(translate.x);
      text.translateY(translate.y);
      text.translateZ(translate.z);
      const textDiv = document.createElement('div');
      textDiv.style.display = 'flex';
      textDiv.style.alignItems = 'flex-end';
      textDiv.style.justifyContent = 'center';
      textDiv.appendChild(
        createPolygonCanvas({
          text: material.textMaterial.text,
          fontSize: material.textMaterial.fontSize,
          fillColor: material.textMaterial.fillColor,
          outlineColor: material.textMaterial.outlineColor,
          isFill: material.textMaterial.isFill,
          isOutline: material.textMaterial.isOutline,
          outlineWidth: material.textMaterial.outlineWidth,
          fontScale: scale.x,
        }),
      );
      const text2D = new CSS2DObject(textDiv);
      text2D.position.set(0, 0, 0);
      text.add(text2D);
      children.push(text);
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
