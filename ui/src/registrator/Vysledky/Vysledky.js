import React from 'react';
import PropTypes from 'prop-types';
import VysledkyStats from './VysledkyStats';
import VysledkyTypu from './VysledkyTypu';
import './Vysledky.css';

const Vysledky = ({ vysledky }) => (
  <div className="Vysledky">
    <VysledkyStats {...vysledky} />
    {Object.values(vysledky.typy).map(typ => <VysledkyTypu key={typ.typ} {...typ} />)}
  </div>
);

Vysledky.propTypes = {
  vysledky: PropTypes.shape({
    typy: PropTypes.object.isRequired
  }).isRequired
};

export default Vysledky;
