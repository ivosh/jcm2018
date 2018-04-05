import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import './Legenda.css';

const LegendaItem = ({ name, popisek }) => (
  <Label className={`Legenda-item Legenda-item-${name}`}>{popisek}</Label>
);

LegendaItem.propTypes = {
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired
};

const Legenda = ({ legenda }) => (
  <div className="Legenda">
    Legenda: {legenda.map(jedna => <LegendaItem key={jedna.name} {...jedna} />)}
  </div>
);

Legenda.propTypes = {
  legenda: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      popisek: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Legenda;
