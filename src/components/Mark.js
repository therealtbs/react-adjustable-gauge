import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';

export default function Mark(props) {
  const points = [-props.offset, 0, -props.offset - props.length, 0];
  return (
    <Line
      points={points}
      stroke={props.color}
      strokeWidth={props.width}
      rotation={props.rotation}
      offsetX={props.outerRadius}
      {...props.center}
    />
  );
}

Mark.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  rotation: PropTypes.number,
  center: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  outerRadius: PropTypes.number.isRequired,
};
Mark.defaultProps = {
  rotation: 0,
};
