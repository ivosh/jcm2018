import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import { STOPKY_ONE_TICK } from '../../constants';
import Displej from './Displej';

class RunningDisplej extends PureComponent {
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
    const { base, delta, running } = this.props;

    const duration = running
      ? moment.duration(this.state.current.getTime() - base.getTime())
      : delta;
    return <Displej duration={duration} />;
  };
}

RunningDisplej.propTypes = {
  base: PropTypes.instanceOf(Date),
  delta: momentPropTypes.momentDurationObj,
  running: PropTypes.bool.isRequired
};

export default RunningDisplej;
