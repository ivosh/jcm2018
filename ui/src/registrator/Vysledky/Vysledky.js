import React from 'react';
import PropTypes from 'prop-types';
import VysledkyStats from './VysledkyStats';
import VysledkyTypu from './VysledkyTypu';
import './Vysledky.css';

const Vysledky = ({ vysledky }) => (
  <div className="Vysledky">
    <h1 className="Vysledky__title">{vysledky.title}</h1>
    <h2 className="Vysledky__subtitle">{vysledky.subtitle}</h2>
    <h3 className="Vysledky__datum">{vysledky.datum}</h3>
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
