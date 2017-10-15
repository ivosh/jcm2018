import React from 'react';
import PropTypes from 'prop-types';
import './Displej.css';

const Displej = ({ hours, mins, secs, subsecs }) => {
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
  hours: PropTypes.string.isRequired,
  mins: PropTypes.string.isRequired,
  secs: PropTypes.string.isRequired,
  subsecs: PropTypes.string.isRequired
};

export default Displej;
