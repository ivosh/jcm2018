import React from 'react';
import PropTypes from 'prop-types';
import StartujiciProTypContainer from '../../../shared/StartujiciProTyp/StartujiciProTypContainer';
import './VyberStartCislo.css';

export const Renderer = ({ id, startCislo, onSelect }) =>
  id ? (
    <div className="StartujiciProTyp-item VyberStartCislo-zabrane" key={startCislo}>
      {startCislo}
    </div>
  ) : (
    <div
      className="StartujiciProTyp-item VyberStartCislo-volne"
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
  <StartujiciProTypContainer
    jenStartujici={false}
    odstartovani={false}
    typ={typ}
    renderer={Renderer}
    onSelect={onSelect}
  />
);

VyberStartCislo.propTypes = {
  typ: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default VyberStartCislo;
