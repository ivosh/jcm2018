import React from 'react';
import PropTypes from 'prop-types';
import PokladnaTypu from './PokladnaTypu';
import './Pokladna.css';

const Pokladna = ({ pokladna }) => (
  <div className="Pokladna">
    <div className="Pokladna__typy">
      {Object.keys(pokladna.typy).map(name => (
        <PokladnaTypu key={name} name={name} {...pokladna.typy[name]} />
      ))}
    </div>
  </div>
);

Pokladna.propTypes = {
  pokladna: PropTypes.shape({
    suma: PropTypes.number.isRequired,
    ucastniku: PropTypes.number.isRequired,
    zaloha: PropTypes.shape({
      count: PropTypes.number.isRequired,
      suma: PropTypes.number.isRequired
    }),
    typy: PropTypes.object
  })
};

export default Pokladna;
