export default class MathUtils {
  static radians(i) {
    return i * (Math.PI / 180);
  }
  static degrees(i) {
    return i * (180 / Math.PI);
  }

  static cosDeg(i) {
    return Math.cos(MathUtils.radians(i));
  }
  static sinDeg(i) {
    return Math.sin(MathUtils.degrees(i));
  }
}
