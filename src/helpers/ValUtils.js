export default class ValUtils {
  constructor(resolution, lowerBound, upperBound) {
    this.resolution = resolution;
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
    this.range = Math.abs(upperBound - lowerBound);
    this.angleResolution = this.range * resolution;
    this.valFactor = 180 / this.range;
  }
  deg2val(angle) {
    return Math.round(
      (
        (angle / (180 / this.angleResolution)) + 180
      )
    ) / this.resolution;
  }
  val2deg(val) {
    return val * this.valFactor;
  }
  safeVal(val) {
    return Math.min(Math.max(val, this.lowerBound), this.upperBound);
  }
  realVal(val) {
    return val - this.lowerBound;
  }
}
