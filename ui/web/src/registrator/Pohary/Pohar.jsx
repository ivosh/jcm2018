import React from 'react';
import PropTypes from 'prop-types';
import { POHAR_NAROK, POHAR_NEPREVZATO, POHAR_PREDANO, TYPY_POHARU } from './PoharyActions';
import './Pohar.css';
import poharNarok from './pohar_narok.svg';
import poharNeprevzato from './pohar_neprevzato.svg';
import poharPredano from './pohar_predano.svg';

const typeToImg = {
  [POHAR_NAROK]: poharNarok,
  [POHAR_NEPREVZATO]: poharNeprevzato,
  [POHAR_PREDANO]: poharPredano,
};

const Pohar = ({ dragAllowed, sizePercentage, type, connectDragSource }) =>
  connectDragSource(
    <img
      src={typeToImg[type]}
      alt={`pohár - ${type}`}
      className={`Pohar ${dragAllowed && 'Pohar--dragAllowed'}`}
      title={`pohár - ${type}`}
      width={(sizePercentage * 517) / 100}
      height={(sizePercentage * 643) / 100}
    />
  );

Pohar.propTypes = {
  dragAllowed: PropTypes.bool,
  sizePercentage: PropTypes.number.isRequired,
  type: PropTypes.oneOf(TYPY_POHARU).isRequired,
  connectDragSource: PropTypes.func,
};

Pohar.defaultProps = {
  sizePercentage: 100,
  connectDragSource: (el) => el,
};

export default Pohar;
