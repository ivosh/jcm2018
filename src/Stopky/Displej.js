import React from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { convertDuration } from '../Util';
import './Displej.css';

const Displej = ({ duration }) => {
  let { hours, mins, secs, subsecs } = convertDuration(duration);

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
  duration: momentPropTypes.momentDurationObj
};

export default Displej;
