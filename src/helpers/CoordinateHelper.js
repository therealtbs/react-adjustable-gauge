import { MathUtils } from '.';
export default class CoordinateHelper {
  static cartesian({ theta, r }) {
    return {
      x: r * MathUtils.cosDeg(theta),
      y: r * MathUtils.sinDeg(theta),
    };
  }
  static polar({ x, y }) {
    return {
      r: Math.sqrt((x * x) + (y * y)),
      theta: MathUtils.degrees(Math.atan(y / x)) + (x >= 0 ? 180 : 0),
    };
  }
  static invertCart({ x, y }) {
    return {
      x: -x,
      y: -y,
    };
  }
}
