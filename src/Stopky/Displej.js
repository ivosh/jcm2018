import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Displej.css';

const Displej = ({ duration }) => {
  let hours, mins, secs, subsecs;
  if (duration === null) {
    hours = '-';
    mins = '--';
    secs = '--';
    subsecs = '--';
  } else {
    hours = duration.hours().toString();
    mins = duration.minutes().toString();
    secs = duration.seconds().toString();
    subsecs = duration.milliseconds().toString();
    if (subsecs.length < 2) {
      subsecs = subsecs + '0';
    } else {
      subsecs = subsecs.slice(0, 2);
    }
  }

  return (
    <span className="Displej">
      <span className="Displej-segment">{hours}</span>
      {':'}
      <span className="Displej-segment">{mins}</span>
      {':'}
      <span className="Displej-segment">{secs}</span>
      {','}
      <span className="Displej-segment">{subsecs}</span>
    </span>
  );
};

Displej.propTypes = {
  duration: PropTypes.object
};

export default Displej;
