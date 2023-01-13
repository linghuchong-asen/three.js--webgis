/*
 * @Description:立方体geometry
 * @Author: yangsen
 * @Date: 2022-12-20 10:52:21
 * @LastEditors: yangsen
 * @LastEditTime: 2022-12-22 17:37:31
 */
import { Vector3 } from 'three/src/math/Vector3.js';
import { BufferGeometry } from 'three';

interface BoxGeometryParams {
  minimum: Vector3;
  maximum: Vector3;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
}
class BoxGeometry extends BufferGeometry {
  minimum: Vector3;
  maximum: Vector3;

  constructor(params: BoxGeometryParams) {
    super();
    this.minimum = params.minimum;
    this.maximum = params.maximum;
    this.type = 'BoxGeometry';

    const width = this.maximum.x - this.minimum.x;
    const height = this.maximum.y - this.maximum.y;
    const depth = this.maximum.z - this.minimum.z;
    const widthSegments = params.widthSegments == undefined ? 1 : params.widthSegments;
    const heightSegments = params.heightSegments == undefined ? 1 : params.heightSegments;
    const depthSegments = params.depthSegments == undefined ? 1 : params.depthSegments;

    // 构建立方体的的6个面
    this.buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0); // px
    this.buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1); // nx
    this.buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
    this.buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3); // ny
    this.buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4); // pz
    this.buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5); // nz
  }
  private scope = this;

  // buffers

  private indices: number[] = []; // 记录顶点数据（position）
  private vertices: number[] = []; // 记录索引数据(index)
  private normals: number[] = []; // 记录法线数据
  private uvs: number[] = []; // 记录纹理坐标

  // helper variables

  private numberOfVertices = 0;
  private groupStart = 0;

  private buildPlane(
    u: string,
    v: string,
    w: string,
    udir: number,
    vdir: number,
    width: number,
    height: number,
    depth: number,
    gridX: number,
    gridY: number,
    materialIndex: number,
  ) {
    const segmentWidth = width / gridX; // 宽除以分段数，一段的长度
    const segmentHeight = height / gridY;

    const widthHalf = width / 2; // 宽度的一半
    const heightHalf = height / 2;
    const depthHalf = depth / 2;

    const gridX1 = gridX + 1; // 分段数加1
    const gridY1 = gridY + 1;

    let vertexCounter = 0;
    let groupCount = 0;

    const vector = new Vector3() as any;

    // generate vertices, normals and uvs

    for (let iy = 0; iy < gridY1; iy++) {
      const y = iy * segmentHeight - heightHalf;

      for (let ix = 0; ix < gridX1; ix++) {
        const x = ix * segmentWidth - widthHalf;

        // 设置值以校正矢量分量
        vector[u] = x * udir;
        vector[v] = y * vdir;
        vector[w] = depthHalf;

        // now apply vector to vertex buffer

        this.vertices.push(vector.x, vector.y, vector.z);

        /* 法向量，因为面是平行于坐标轴的，所以一个方向的值就可以代表法向量 */
        vector[u] = 0;
        vector[v] = 0;
        vector[w] = depth > 0 ? 1 : -1;

        // now apply vector to normal buffer

        this.normals.push(vector.x, vector.y, vector.z);

        // uvs
        /* 纹理坐标 */
        this.uvs.push(ix / gridX);
        this.uvs.push(1 - iy / gridY);

        // counters

        vertexCounter += 1;
      }
    }

    // indices索引

    // 1. you need three indices to draw a single face
    // 2. a single segment consists of two faces
    // 3. so we need to generate six (2*3) indices per segment

    for (let iy = 0; iy < gridY; iy++) {
      for (let ix = 0; ix < gridX; ix++) {
        const a = this.numberOfVertices + ix + gridX1 * iy;
        const b = this.numberOfVertices + ix + gridX1 * (iy + 1);
        const c = this.numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
        const d = this.numberOfVertices + (ix + 1) + gridX1 * iy;

        // faces

        this.indices.push(a, b, d);
        this.indices.push(b, c, d);

        // increase counter

        groupCount += 6;
      }
    }

    // add a group to the geometry. this will ensure multi material support

    this.scope.addGroup(this.groupStart, groupCount, materialIndex);

    // calculate new start value for groups

    this.groupStart += groupCount;

    // update total number of vertices

    this.numberOfVertices += vertexCounter;
  }
}

export { BoxGeometry };
