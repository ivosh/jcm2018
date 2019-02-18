import React from 'react';
import PropTypes from 'prop-types';
import './Pohar.css';
import poharNarok from './pohar_narok.svg';
import poharNeprevzato from './pohar_neprevzato.svg';
import poharPredano from './pohar_predano.svg';

const styleToImg = {
  nárok: poharNarok,
  nepřevzato: poharNeprevzato,
  předáno: poharPredano
};

const Pohar = ({ poharStyle, sizePercentage }) => (
  <img
    src={styleToImg[poharStyle]}
    alt={`pohár - ${poharStyle}`}
    className="Pohar"
    title={`pohár - ${poharStyle}`}
    width={(sizePercentage * 517) / 100}
    height={(sizePercentage * 643) / 100}
  />
);

Pohar.propTypes = {
  poharStyle: PropTypes.oneOf(['nárok', 'nepřevzato', 'předáno']).isRequired,
  sizePercentage: PropTypes.number.isRequired
};

Pohar.defaultProps = {
  sizePercentage: 100
};

export default Pohar;
