import React from 'react';
import PropTypes from 'prop-types';
import muz from './muz.png';
import zena from './zena.png';

const pohlaviToImg = {
  muž: muz,
  žena: zena
};

const PopisekPohlavi = ({ pohlavi }) => (
  <img src={pohlaviToImg[pohlavi]} alt={pohlavi} title={pohlavi} height={28} />
);

PopisekPohlavi.propTypes = {
  pohlavi: PropTypes.oneOf(['muž', 'žena'])
};

export default PopisekPohlavi;
