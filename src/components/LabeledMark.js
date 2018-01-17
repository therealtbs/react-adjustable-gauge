import React from 'react';
import PropTypes from 'prop-types';
import { Group, Text } from 'react-konva';
import measureText from 'text-width';
import { MathUtils } from '../helpers';
import { Mark } from '.';

export default function LabeledMark(props) {
  const offsetFrom90 = props.angle - 270;
  const width = measureText(props.text, {
    family: 'Arial',
    style: props.fontStyle,
    size: props.fontSize,
  }) * 1.1;
  return (
    <Group
      rotation={-props.angle}
      offsetX={props.outerRadius}
      {...props.center}
    >
      <Mark
        color={props.color}
        width={props.width}
        length={props.length}
        offset={props.offset}
        outerRadius={0}
        center={{ x: 0, y: 0 }}
      />
      <Group rotation={props.angle}>
        <Text
          fill={props.textColor || props.color}
          fontSize={props.fontSize}
          fontStyle={props.fontStyle}
          text={props.text}
          align="center"
          width={width}
          x={(-width / 2) - ((props.outerRadius / 5) * Math.sin(MathUtils.radians(offsetFrom90)))}
          y={-props.fontSize - ((props.outerRadius / 10) * Math.abs(MathUtils.cosDeg(offsetFrom90)))}
        />
      </Group>
    </Group>
  );
}

LabeledMark.propTypes = {
  angle: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.number,
  length: PropTypes.number,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  center: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  outerRadius: PropTypes.number,
  offset: PropTypes.number,
  fontSize: PropTypes.number,
  fontStyle: PropTypes.oneOf(['bold', 'italic', 'normal']),
};
LabeledMark.defaultProps = {
  fontSize: 16,
  fontStyle: 'normal',
};
