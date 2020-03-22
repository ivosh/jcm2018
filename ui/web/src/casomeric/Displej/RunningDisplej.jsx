import React, { useState } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import { STOPKY_ONE_TICK } from '../../constants';
import useInterval from '../../useInterval';
import Displej from './Displej';

const RunningDisplej = ({ base, delta, running }) => {
  const [current, setCurrent] = useState(new Date());

  useInterval(
    () => {
      setCurrent(new Date());
    },
    running ? STOPKY_ONE_TICK : null
  );

  const duration = running ? moment.duration(current.getTime() - base.getTime()) : delta;
  return <Displej duration={duration} />;
};

RunningDisplej.propTypes = {
  base: PropTypes.instanceOf(Date),
  delta: momentPropTypes.momentDurationObj,
  running: PropTypes.bool.isRequired,
};

RunningDisplej.defaultProps = {
  base: undefined,
  delta: undefined,
};

export default RunningDisplej;
