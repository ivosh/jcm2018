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
      role="button"
      tabIndex="-1" // :TODO: enable keyboard navigation
      onClick={onClick}
      onKeyPress={onClick}
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
Renderer.defaultProps = {
  id: undefined,
  vybraneId: undefined,
  vybraneStartCislo: undefined
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
VyberStartCislo.defaultProps = {
  vybraneId: undefined,
  vybraneStartCislo: undefined
};

export default VyberStartCislo;
