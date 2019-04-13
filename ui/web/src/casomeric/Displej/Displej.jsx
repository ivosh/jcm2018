import React from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { convertDuration } from '../../Util';
import './Displej.css';

const Displej = ({ duration }) => {
  const { hours, mins, secs, subsecs } = convertDuration(duration);

  return (
    <React.Fragment>
      <span className="Displej__segment">{hours}</span>
      <span className="Displej__separator">:</span>
      <span className="Displej__segment">{mins}</span>
      <span className="Displej__separator">:</span>
      <span className="Displej__segment">{secs}</span>
      <span className="Displej__separator">,</span>
      <span className="Displej__segment">{subsecs}</span>
    </React.Fragment>
  );
};

Displej.propTypes = {
  duration: momentPropTypes.momentDurationObj
};

export default Displej;
