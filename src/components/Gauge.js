import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Group } from 'react-konva';
import { ValUtils, CoordinateHelper } from '../helpers';
import { AnimatedGauge } from '.';

export default class Gauge extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    upperBound: PropTypes.number.isRequired,
    lowerBound: PropTypes.number.isRequired,
    numDigits: PropTypes.number,
    radius: PropTypes.number.isRequired,
    offsetBottom: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    touchRange: PropTypes.arrayOf(PropTypes.number),
    gaugeWidth: PropTypes.number.isRequired,
  };
  static defaultProps = {
    numDigits: 1,
    offsetBottom: 5,
    touchRange: [60, 100],
  };
  constructor(props) {
    super(props);
    this.resolution = 10 ** props.numDigits;
    this.valUtils = new ValUtils(
      this.resolution,
      props.lowerBound,
      props.upperBound
    );
    this.state = {
      clicked: false,
      center: { x: props.width / 2, y: props.height - props.offsetBottom },
    };
    this.down = this.down.bind(this);
    this.move = this.move.bind(this);
    this.up = this.up.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.up);
    document.addEventListener('touchend', this.up);
    document.addEventListener('mousemove', this.move);
    document.addEventListener('touchmove', this.move);
    this.controlAdj();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height ||
      nextProps.offsetBottom !== this.props.offsetBottom
    ) {
      this.setState({
        center: { x: nextProps.width / 2, y: nextProps.height - nextProps.offsetBottom },
      });
    }
  }

  componentDidUpdate() {
    this.controlAdj();
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.up);
    document.removeEventListener('touchend', this.up);
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
  }

  down(e) {
    if (e.type === 'contentMousedown' && e.evt.which !== 1) return;
    this.setState({
      clicked: true,
    });
    this.move(e);
  }
  move() {
    if (!this.state.clicked) return;
    const { radius, gaugeWidth, touchRange, height, offsetBottom } = this.props;
    const pos = this.stage.getStage().getPointerPosition();
    if (!pos) return;
    pos.x -= this.props.width / 2;
    pos.y = Math.min(pos.y, height - offsetBottom) - (height - offsetBottom);
    const { r, theta } = CoordinateHelper.polar(pos);
    if (
      r > radius + gaugeWidth + touchRange[1] ||
      r < radius - touchRange[0]
    ) {
      return;
    }
    this.adjustableGauges.forEach((f) => f(this.valUtils.deg2val(theta)));
  }
  up() {
    this.setState({
      clicked: false,
    });
  }
  addCommonProps(e) {
    return React.cloneElement(e, {
      valUtils: this.valUtils,
      gaugeRadius: this.props.radius,
      center: this.state.center,
      width: e.props.width || this.props.gaugeWidth,
    });
  }
  controlAdj() {
    const adjustableGauges = React.Children
      .map(this.props.children, (e) => e)
      .filter((e) => e.type === AnimatedGauge && e.props.adjustable)
      .map((e) => e.props.onChange);
    if (adjustableGauges.length > 0) {
      this.adjustableGauges = adjustableGauges;
    }
  }
  render() {
    return (
      <Stage
        width={this.props.width}
        height={this.props.height}
        oncontentmousedown={this.down}
        oncontenttouchstart={this.down}
        ref={(e) => {
          this.stage = e;
        }}
      >
        {React.Children.map(this.props.children, (e) => (
          <Layer>
            {e.type === Group
              ? React.cloneElement(
                e,
                {},
                React.Children.map(e.props.children, (child) =>
                  this.addCommonProps(child)
                )
              )
              : this.addCommonProps(e)}
          </Layer>
        ))}
      </Stage>
    );
  }
}
