import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { range } from 'lodash';
import 'prop-types';
import 'react-dom';
import { Group, Text } from 'react-konva';
import { GaugeBackground, AnimatedGauge, GaugeMarks, LabeledMark, Gauge } from '../src';

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 20,
      secondary: 19.5,
    };
    this.valueChange = this.valueChange.bind(this);
  }
  valueChange(v) {
    this.setState({
      value: v,
    });
  }
  render() {
    const radius = 130;
    const width = 30;
    const lowerBound = 18;
    const valueStep = 30;
    return (
      <div>
        <Gauge
          width={450}
          height={250}
          upperBound={24}
          lowerBound={lowerBound}
          radius={radius}
          offsetBottom={20}
          gaugeWidth={width}
        >
          <Group>
            <GaugeBackground color="#ccc" />
            <GaugeMarks
              count={60}
              offset={2}
              length={12}
              width={2}
              outerRadius={radius + width}
              color="#ccc"
            >
              {
                range(360, 180 - 1, -valueStep).map((i) => ( // lodash range param is exclusive, therefore 180 - 1
                  <LabeledMark
                    key={i}
                    angle={i}
                    text={`${lowerBound + ((360 - i) / valueStep)}°`}
                    width={4}
                    color="#bbb"
                    textColor="#aaa"
                    fontStyle="bold"
                  />
                ))
              }
            </GaugeMarks>
          </Group>
          <AnimatedGauge
            value={this.state.value}
            color="#06D6A0"
            duration={50}
            adjustable
            onChange={this.valueChange}
          >
            {({ value }) => (
              <Text x={(450 / 2) - 100} y={220 - 45} width={200} text={`${value.toFixed(1)}°C`} fontSize={40} align="center" fontStyle="bold" />
            )}
          </AnimatedGauge>
          <AnimatedGauge
            value={this.state.secondary}
            width={6}
            color="#FFD166"
            duration={50}
          >
            {({ value }) => (
              <Text x={(450 / 2) - 100} y={220 - 5} width={200} text={`Current Temperature: ${value.toFixed(1)}°C`} fontSize={12} align="center" fill="#aaa" />
            )}
          </AnimatedGauge>
        </Gauge>
        <label htmlFor="value">
          Main Value:
          <input name="value" type="number" step="0.1" onChange={(e) => this.setState({ value: Number(e.target.value) })} value={this.state.value} />
        </label>
        <label htmlFor="secondary">
          Secondary Value:
          <input name="secondary" type="number" step="0.1" onChange={(e) => this.setState({ secondary: Number(e.target.value) })} value={this.state.secondary} />
        </label>
      </div>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById('app'));
