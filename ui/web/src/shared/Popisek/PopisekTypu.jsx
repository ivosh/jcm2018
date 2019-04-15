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
  heightPercentage: PropTypes.number,
  pohlavi: PropTypes.oneOf(['muž', 'žena']), // eslint-disable-line react/require-default-props
  typ: PropTypes.oneOf(['cyklo', 'koloběžka', 'maraton', 'pěší', 'půlmaraton']).isRequired,
  typAsText: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  vek: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

PopisekTypu.defaultProps = {
  heightPercentage: 100,
  typAsText: false
};

export default PopisekTypu;
