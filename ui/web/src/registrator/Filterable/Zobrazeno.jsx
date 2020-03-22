import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import './Zobrazeno.css';

const Zobrazeno = ({ numberOfItems }) => (
  <span className="Zobrazeno">
    zobrazeno: <Badge>{numberOfItems}</Badge>
  </span>
);

Zobrazeno.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
};

export default Zobrazeno;
