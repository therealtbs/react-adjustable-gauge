import React from 'react';
import PropTypes from 'prop-types';
import { ValueArc } from '.';
import Animate from 'react-move/Animate';
import { Group } from 'react-konva';
import { circleInOut } from 'd3-ease/src/circle';

export default function AnimatedGauge(props) {
  return (
    <Animate
      start={{
        value: props.value,
        color: props.color,
      }}
      update={[
        {
          value: [props.value],
          timing: {
            duration: props.duration,
            ease: circleInOut,
          },
        },
      ]}
    >
      {({ value, color }) => (
        <Group>
          <ValueArc
            {...props}
            value={value}
            color={color}
          />
          {props.children && props.children({ value })}
        </Group>
      )}
    </Animate>
  );
}

AnimatedGauge.propTypes = {
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number,
  adjustable: PropTypes.bool,
  onChange: PropTypes.func,
  gaugeRadius: PropTypes.number,
  center: PropTypes.object,
  duration: PropTypes.number.isRequired,
  children: PropTypes.func,
};
