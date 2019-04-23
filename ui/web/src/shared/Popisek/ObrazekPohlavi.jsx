import React from 'react';
import PropTypes from 'prop-types';
import muz from '../../../../common/Popisek/muz.png';
import zena from '../../../../common/Popisek/zena.png';

const pohlaviToImg = {
  muž: muz,
  žena: zena
};

const ObrazekPohlavi = ({ heightPercentage, pohlavi }) => (
  <img
    src={pohlaviToImg[pohlavi]}
    alt={pohlavi}
    title={pohlavi}
    height={(heightPercentage * 28) / 100}
  />
);

ObrazekPohlavi.propTypes = {
  heightPercentage: PropTypes.number,
  pohlavi: PropTypes.oneOf(['muž', 'žena']).isRequired
};

ObrazekPohlavi.defaultProps = {
  heightPercentage: 100
};

export default ObrazekPohlavi;
