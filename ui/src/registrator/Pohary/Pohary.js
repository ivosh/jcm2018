import React from 'react';
import PropTypes from 'prop-types';
import Pohar from './Pohar';

const Pohary = ({ count, poharStyle }) => (
  <div>
    {Array(count)
      .fill(1)
      .map((val, index) => (
        <Pohar key={index} poharStyle={poharStyle} sizePercentage={4} />
      ))}
  </div>
);

Pohary.propTypes = {
  count: PropTypes.number.isRequired,
  poharStyle: PropTypes.oneOf(['nárok', 'nepřevzato', 'předáno']).isRequired
};

export default Pohary;
