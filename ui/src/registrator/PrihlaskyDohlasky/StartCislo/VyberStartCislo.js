import React from 'react';
import PropTypes from 'prop-types';
import StartovniCislaProTypContainer from '../../../shared/StartovniCislaProTyp/StartovniCislaProTypContainer';
import './VyberStartCislo.css';

export const Renderer = ({ id, startCislo, onSelect }) =>
  id ? (
    <div className="StartovniCislaProTyp__item VyberStartCislo-zabrane" key={startCislo}>
      {startCislo}
    </div>
  ) : (
    <div
      className="StartovniCislaProTyp__item VyberStartCislo-volne"
      key={startCislo}
      onClick={() => onSelect(startCislo)}
    >
      {startCislo}
    </div>
  );

Renderer.propTypes = {
  id: PropTypes.string,
  startCislo: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

const VyberStartCislo = ({ typ, onSelect }) => (
  <StartovniCislaProTypContainer
    jenStartujici={false}
    odstartovani={false}
    typ={typ}
    Renderer={Renderer}
    onSelect={onSelect}
  />
);

VyberStartCislo.propTypes = {
  typ: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default VyberStartCislo;
