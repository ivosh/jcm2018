import React from 'react';
import PropTypes from 'prop-types';
import PopisekPohlavi from './PopisekPohlavi';
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

const PopisekKategorie = ({ pohlavi, typ, typAsText, vek }) => (
  <span>
    <img src={typToImg[typ]} alt={typ} height={30} />{' '}
    {renderTyp({ pohlavi, typAsText, vek }) && typ}
    {pohlavi && <PopisekPohlavi pohlavi={pohlavi} />}
    {vek && `${vek.min} ${vek.max === 150 ? 'let a více' : `- ${vek.max} let`}`}
  </span>
);

PopisekKategorie.propTypes = {
  pohlavi: PropTypes.oneOf(['muž', 'žena']),
  typ: PropTypes.oneOf(['cyklo', 'koloběžka', 'maraton', 'pěší', 'půlmaraton']).isRequired,
  typAsText: PropTypes.bool,
  vek: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default PopisekKategorie;
