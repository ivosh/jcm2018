import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { STOPKY_ONE_TICK } from '../../constants';
import Displej from './Displej';

/* Split from Stopky to minimalize reconciliation (unnecessary updates). */
class StopkyDisplej extends Component {
  state = { current: new Date() };

  componentDidMount = () => {
    if (this.props.running) {
      this.timerID = setInterval(() => this.tick(), STOPKY_ONE_TICK);
    }
  };

  componentWillUnmount = () => {
    this.stopTimer();
  };

  stopTimer = () => {
    clearInterval(this.timerID);
    this.timerID = null;
  };

  tick = () => {
    this.setState({ current: new Date() });
  };

  startTimer = () => {
    this.timerID = setInterval(() => this.tick(), STOPKY_ONE_TICK);
  };

  render = () => {
    const { base } = this.props;

    let duration = null;
    if (base !== null) {
      duration = moment.duration(this.state.current.getTime() - base.getTime());
    }

    return <Displej duration={duration} />;
  };
}

StopkyDisplej.propTypes = {
  base: PropTypes.instanceOf(Date),
  running: PropTypes.bool.isRequired
};

export default StopkyDisplej;
