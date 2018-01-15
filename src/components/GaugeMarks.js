import React from 'react';
import PropTypes from 'prop-types';
import { childrenOfType } from '../helpers/PTValidators';
import { LabeledMark, Mark } from '.';
import { mapKeys } from 'lodash';
import { Group } from 'react-konva';

export default function GaugeMarks(props) {
  const marks = [];
  const labeledMarks = mapKeys(
    React.Children.map(props.children, (e) =>
      React.cloneElement(e, {
        center: props.center,
        outerRadius: props.outerRadius,
        key: e.props.angle,
        width: e.props.width || props.width,
        length: e.props.length || props.length,
        color: e.props.color || props.color,
        offset: e.props.offset || props.offset,
        // angle: 360 - e.props.angle
      })
    ),
    (val) => val.props.angle
  );
  for (let i = 180; i <= 360; i += 180 / props.count) {
    marks.push(
      labeledMarks[i] || (
        <Mark
          key={i}
          length={props.length}
          color={props.color}
          offset={props.offset}
          width={props.width}
          rotation={-i}
          center={props.center}
          outerRadius={props.outerRadius}
        />
      )
    );
  }
  return <Group>{marks}</Group>;
}

GaugeMarks.propTypes = {
  offset: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  children: childrenOfType([LabeledMark]),
  count: PropTypes.number.isRequired,
  center: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  outerRadius: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
