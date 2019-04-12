import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import './LegendaItem.css';

const LegendaItem = ({ name, popisek, connectDropTarget, isDropOver }) =>
  connectDropTarget(
    <div>
      <Label
        className={`Legenda__item Legenda__item--${name} Legenda-casomeric__item ${
          isDropOver ? 'Legenda__item--isDropOver' : ''
        }`}
      >
        {popisek}
      </Label>
    </div>
  );

LegendaItem.propTypes = {
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDropOver: PropTypes.bool.isRequired
};

export default LegendaItem;
