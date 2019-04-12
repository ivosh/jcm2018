import React from 'react';
import PropTypes from 'prop-types';
import cyklo from './cyklo.png';
import kolobezka from './kolobezka.png';
import maraton from './maraton.png';
import pesi from './pesi.png';
import pulmaraton from './pulmaraton.png';

const typToImg = {
  cyklo,
  koloběžka: kolobezka,
  maraton,
  pěší: pesi,
  půlmaraton: pulmaraton
};

const renderTyp = ({ pohlavi, typAsText, vek }) => (!pohlavi && !vek) || typAsText;

const PopisekTypu = ({ heightPercentage, pohlavi, typ, typAsText, vek }) => (
  <React.Fragment>
    <img src={typToImg[typ]} alt={typ} title={typ} height={(30 * heightPercentage) / 100} />{' '}
    {renderTyp({ pohlavi, typAsText, vek }) && typ}
  </React.Fragment>
);

PopisekTypu.propTypes = {
  heightPercentage: PropTypes.number.isRequired,
  pohlavi: PropTypes.oneOf(['muž', 'žena']),
  typ: PropTypes.oneOf(['cyklo', 'koloběžka', 'maraton', 'pěší', 'půlmaraton']).isRequired,
  typAsText: PropTypes.bool,
  vek: PropTypes.object
};

PopisekTypu.defaultProps = {
  heightPercentage: 100
};

export default PopisekTypu;
