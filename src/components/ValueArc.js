import React from 'react';
import PropTypes from 'prop-types';
import { Arc } from 'react-konva';
import { ValUtils } from '../helpers';

ValueArc.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  gaugeRadius: PropTypes.number,
  center: PropTypes.object,
  width: PropTypes.number,
  valUtils: PropTypes.instanceOf(ValUtils),
};

export default function ValueArc({ value, valUtils, color, width, gaugeRadius, center, ...filteredProps }) {
  const safeVal = valUtils.safeVal(value);
  const angle = valUtils.val2deg(valUtils.realVal(safeVal));

  return (
    <Arc
      fill={color}
      angle={angle}
      innerRadius={gaugeRadius}
      outerRadius={gaugeRadius + width}
      {...center}
      {...filteredProps}
      rotation={180}
    />
  );
}
