import React from 'react';
import PropTypes from 'prop-types';
import { ValueArc } from '.';

export default function GaugeBackground({ color, width, valUtils, gaugeRadius, center }) {
  return (
    <ValueArc
      color={color}
      width={width}
      valUtils={valUtils}
      gaugeRadius={gaugeRadius}
      center={center}
      value={valUtils.upperBound}
    />
  );
}

GaugeBackground.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number,
  gaugeRadius: PropTypes.number,
  center: PropTypes.object,
  valUtils: PropTypes.object,
};
