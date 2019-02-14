import React from 'react';
import PropTypes from 'prop-types';
import './Pohar.css';
import pohar from './pohar.svg';

const Pohar = ({ sizePercentage }) => (
  <img
    src={pohar}
    alt="pohár"
    className="Pohar"
    title="pohár"
    width={(sizePercentage * 517) / 100}
    height={(sizePercentage * 643) / 100}
  />
);

Pohar.propTypes = {
  sizePercentage: PropTypes.number.isRequired
};

Pohar.defaultProps = {
  sizePercentage: 100
};

export default Pohar;
