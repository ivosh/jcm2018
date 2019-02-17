import React from 'react';
import PropTypes from 'prop-types';
import './Pohar.css';
import pohar_narok from './pohar_narok.svg';
import pohar_neprevzato from './pohar_neprevzato.svg';
import pohar_predano from './pohar_predano.svg';

const styleToImg = {
  nárok: pohar_narok,
  nepřevzato: pohar_neprevzato,
  předáno: pohar_predano
};

const Pohar = ({ sizePercentage, style }) => (
  <img
    src={styleToImg[style]}
    alt={`pohár - ${style}`}
    className="Pohar"
    title={`pohár - ${style}`}
    width={(sizePercentage * 517) / 100}
    height={(sizePercentage * 643) / 100}
  />
);

Pohar.propTypes = {
  sizePercentage: PropTypes.number.isRequired,
  style: PropTypes.oneOf(['nárok', 'nepřevzato', 'předáno']).isRequired
};

Pohar.defaultProps = {
  sizePercentage: 100
};

export default Pohar;
