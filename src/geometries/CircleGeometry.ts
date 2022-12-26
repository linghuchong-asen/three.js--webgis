/*
 * @Description:圆形geometry
 * @Author: yangsen
 * @Date: 2022-12-20 10:53:13
 * @LastEditors: yangsen
 * @LastEditTime: 2022-12-23 14:34:46
 */

import { BufferGeometry, Float32BufferAttribute, Vector2, Vector3 } from 'three';

class CircleGeometry extends BufferGeometry {
  position: Vector3;
  constructor(radius = 1, segments = 8, thetaStart = 0, thetaLength = Math.PI * 2, position: Vector3) {
    super();
    this.type = 'CircleGeometry';
    this.position = position;
    segments = Math.max(3, segments);

    // buffers

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    // helper variables

    const vertex = new Vector3();
    const uv = new Vector2();

    // center point

    vertices.push(0, 0, 0);
    normals.push(0, 0, 1);
    uvs.push(0.5, 0.5);

    for (let s = 0, i = 3; s <= segments; s++, i += 3) {
      const segment = thetaStart + (s / segments) * thetaLength;

      // vertex

      vertex.x = radius * Math.cos(segment);
      vertex.y = radius * Math.sin(segment);

      vertices.push(vertex.x, vertex.y, vertex.z);

      // normal

      normals.push(0, 0, 1);

      // uvs

      uv.x = (vertices[i] / radius + 1) / 2;
      uv.y = (vertices[i + 1] / radius + 1) / 2;

      uvs.push(uv.x, uv.y);
    }

    // indices

    for (let i = 1; i <= segments; i++) {
      indices.push(i, i + 1, 0);
    }

    // build geometry

    this.setIndex(indices);
    this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  }
}

export { CircleGeometry };
