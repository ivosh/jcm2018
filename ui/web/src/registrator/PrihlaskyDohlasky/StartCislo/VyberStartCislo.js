import React from 'react';
import PropTypes from 'prop-types';
import StartovniCislaProTypContainer from '../../../shared/StartovniCislaProTyp/StartovniCislaProTypContainer';
import './VyberStartCislo.css';

export const Renderer = ({ id, startCislo, vybraneId, vybraneStartCislo, onSelect }) => {
  const vybrane = startCislo === vybraneStartCislo && (!vybraneId || vybraneId === id);
  const zabrane = !!id;

  const className = vybrane ? 'vybrane' : zabrane ? 'zabrane' : 'volne';
  const onClick = vybrane || !zabrane ? () => onSelect(startCislo) : undefined;
  return (
    <div
      className={`StartovniCislaProTyp__item VyberStartCislo-${className}`}
      key={startCislo}
      onClick={onClick}
    >
      {startCislo}
    </div>
  );
};

Renderer.propTypes = {
  id: PropTypes.string,
  startCislo: PropTypes.number.isRequired,
  vybraneId: PropTypes.string,
  vybraneStartCislo: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};

const VyberStartCislo = ({ typ, vybraneId, vybraneStartCislo, onSelect }) => (
  <StartovniCislaProTypContainer
    jenStartujici={false}
    odstartovani={false}
    typ={typ}
    vybraneId={vybraneId}
    vybraneStartCislo={vybraneStartCislo}
    Renderer={Renderer}
    onSelect={onSelect}
  />
);

VyberStartCislo.propTypes = {
  typ: PropTypes.string.isRequired,
  vybraneId: PropTypes.string,
  vybraneStartCislo: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};

export default VyberStartCislo;
