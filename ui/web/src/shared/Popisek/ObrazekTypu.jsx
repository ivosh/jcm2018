import React from 'react';
import PropTypes from 'prop-types';
import cyklo from '../../../../common/Popisek/cyklo.png';
import kolobezka from '../../../../common/Popisek/kolobezka.png';
import maraton from '../../../../common/Popisek/maraton.png';
import pesi from '../../../../common/Popisek/pesi.png';
import pulmaraton from '../../../../common/Popisek/pulmaraton.png';

const typToImg = {
  cyklo,
  koloběžka: kolobezka,
  maraton,
  pěší: pesi,
  půlmaraton: pulmaraton
};

const ObrazekTypu = ({ heightPercentage, typ }) => (
  <img src={typToImg[typ]} alt={typ} title={typ} height={(30 * heightPercentage) / 100} />
);

ObrazekTypu.propTypes = {
  heightPercentage: PropTypes.number,
  typ: PropTypes.oneOf(['cyklo', 'koloběžka', 'maraton', 'pěší', 'půlmaraton']).isRequired
};

ObrazekTypu.defaultProps = {
  heightPercentage: 100
};

export default ObrazekTypu;
