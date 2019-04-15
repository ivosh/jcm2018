import React from 'react';
import PropTypes from 'prop-types';
import muz from './muz.png';
import zena from './zena.png';

const pohlaviToImg = {
  muž: muz,
  žena: zena
};

const PopisekPohlavi = ({ heightPercentage, pohlavi }) => (
  <img
    src={pohlaviToImg[pohlavi]}
    alt={pohlavi}
    title={pohlavi}
    height={(heightPercentage * 28) / 100}
  />
);

PopisekPohlavi.propTypes = {
  heightPercentage: PropTypes.number,
  pohlavi: PropTypes.oneOf(['muž', 'žena']).isRequired
};

PopisekPohlavi.defaultProps = {
  heightPercentage: 100
};

export default PopisekPohlavi;
