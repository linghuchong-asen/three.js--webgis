/*
 * @Description: 直角坐标系，包含坐标系转换的函数
 * @Author: yangsen
 * @Date: 2023-03-23 14:16:46
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-23 14:40:43
 */
import { BigNumber } from 'bignumber.js';
import { Matrix4, Vector3 } from 'three';
class Cartesian3 {
  constructor() {}
  /**
   * @description: 传参经纬度加高程，返回值为符合osg earth坐标转换的4*4矩阵
   * @param {number} longitude
   * @param {number} latitude
   * @param {number} H
   * @return {Matrix4}
   */
  static LBHtoXYZ = (
    longitude: number,
    latitude: number,
    H: number,
  ): Matrix4 => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const localToWorld = new Matrix4().set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
    );
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const L = new BigNumber(longitude * (3.1415926535897932 / 180));
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const B = new BigNumber(latitude * (3.1415926535897932 / 180));
    const a = new BigNumber(6378137.0); // 长半轴
    const b = new BigNumber(6356752.3142451793); // 短半轴
    const e = a
      .exponentiatedBy(2)
      .minus(b.exponentiatedBy(2))
      .squareRoot()
      .dividedBy(a); // 椭球偏心率
    const N = a.dividedBy(
      new BigNumber(1)
        .minus(
          e
            .exponentiatedBy(2)
            .times(new BigNumber(Math.sin(B.toNumber())).exponentiatedBy(2)),
        )
        .squareRoot(),
    ); // 椭球曲率半径
    const X = N.plus(new BigNumber(H))
      .times(new BigNumber(Math.cos(B.toNumber())))
      .times(new BigNumber(Math.cos(L.toNumber())));

    const Y = N.plus(new BigNumber(H))
      .times(new BigNumber(Math.cos(B.toNumber())))
      .times(new BigNumber(Math.sin(L.toNumber())));

    const Z = N.times(new BigNumber(1).minus(e.exponentiatedBy(2)))
      .plus(new BigNumber(H))
      .times(new BigNumber(Math.sin(B.toNumber())));

    let _eccentricitySquared: number;
    (function computeCoefficients() {
      const flattening = a.minus(b).dividedBy(a);
      _eccentricitySquared = flattening
        .times(2)
        .minus(flattening.exponentiatedBy(2))
        .toNumber();
    })();

    let latitudeTransition!: number;
    let longitudeTransition!: number;
    // @ts-ignore
    let heightTransition: number;
    /**
     * @description: 传入上面计算出来的直角坐标系下的X Y Z;目的是计算出三个经纬度高度的中间值，为computeCoordinateFrame函数做准备
     * @param {BigNumber} X
     * @param {BigNumber} Y
     * @param {BigNumber} Z
     * @return {*}
     */
    function convertXYZToLatLongHeight(
      X: BigNumber,
      Y: BigNumber,
      Z: BigNumber,
    ) {
      // handle polar and center-of-earth cases directly.
      if (X.toNumber() != 0.0) {
        longitudeTransition = Math.atan2(Y.toNumber(), X.toNumber());
      } else {
        if (Y.toNumber() > 0.0) longitudeTransition = Math.PI / 2;
        else if (Y.toNumber() < 0.0) longitudeTransition = -Math.PI / 2;
        else {
          // at pole or at center of the earth
          longitudeTransition = 0.0;
          if (Z.toNumber() > 0.0) {
            // north pole.
            latitudeTransition = Math.PI / 2;
            heightTransition = Z.minus(b).toNumber();
          } else if (Z.toNumber() < 0.0) {
            // south pole.
            latitudeTransition = -Math.PI / 2;
            heightTransition = Z.negated().minus(b).toNumber();
          } else {
            // center of earth.
            latitudeTransition = Math.PI / 2;
            heightTransition = b.negated().toNumber();
          }
          return;
        }
      }

      // http://www.colorado.edu/geography/gcraft/notes/datum/gif/xyzllh.gif
      const p = X.exponentiatedBy(2).plus(Y.exponentiatedBy(2)).squareRoot();
      const theta = Math.atan2(Z.times(a).toNumber(), p.times(b).toNumber());
      const eDashSquared = a
        .exponentiatedBy(2)
        .minus(b.exponentiatedBy(2))
        .dividedBy(b.exponentiatedBy(2));

      const sin_theta = Math.sin(theta);
      const cos_theta = Math.cos(theta);

      latitudeTransition = Math.atan(
        eDashSquared
          .times(b)
          .times(sin_theta)
          .times(sin_theta)
          .times(sin_theta)
          .plus(Z)
          .dividedBy(
            new BigNumber(_eccentricitySquared)
              .times(a)
              .times(cos_theta)
              .times(cos_theta)
              .times(cos_theta)
              .negated()
              .plus(p),
          )
          .toNumber(),
      );
      const sin_latitude = Math.sin(latitude);
      const N = a.dividedBy(
        new BigNumber(_eccentricitySquared)
          .times(sin_latitude)
          .times(sin_latitude)
          .negated()
          .plus(1.0)
          .squareRoot(),
      );
      heightTransition = p.dividedBy(Math.cos(latitude)).minus(N).toNumber();
    }

    convertXYZToLatLongHeight(X, Y, Z);

    // localToWorld先赋值了T，再计算赋值R
    let up!: Vector3;
    let east!: Vector3;
    const north: Vector3 = new Vector3();

    function computeCoordinateFrame(latitude: number, longitude: number) {
      // Compute up vector
      up = new Vector3(
        Math.cos(longitude) * Math.cos(latitude),
        Math.sin(longitude) * Math.cos(latitude),
        Math.sin(latitude),
      );
      north.copy(up);
      // Compute east vector
      east = new Vector3(-Math.sin(longitude), Math.cos(longitude), 0);

      // Compute north vector = outer product up x east
      north.cross(east);
    }

    computeCoordinateFrame(latitudeTransition, longitudeTransition);
    localToWorld.set(
      east.x,
      north.x,
      up.x,
      X.toNumber(),
      east.y,
      north.y,
      up.y,
      Y.toNumber(),
      east.z,
      north.z,
      up.z,
      Z.toNumber(),
      0,
      0,
      0,
      1,
    );
    return localToWorld;
  };
}
export { Cartesian3 };
