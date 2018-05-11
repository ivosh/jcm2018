import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import Mezicas from './Mezicas';
import './Mezicasy.css';

const Mezicasy = ({ mezicasy }) => (
  <div className="Mezicasy__grid">
    <div className="Mezicasy__header">#</div>
    <div className="Mezicasy__leftHeader">čas</div>
    <div className="Mezicasy__middleHeader">číslo</div>
    <div className="Mezicasy__header" />
    {mezicasy.map((mezicas, index) => <Mezicas key={index} poradi={index + 1} {...mezicas} />)}
  </div>
);

Mezicasy.propTypes = {
  mezicasy: PropTypes.arrayOf(
    PropTypes.shape({
      cas: momentPropTypes.momentDurationObj,
      startCislo: PropTypes.number,
      onEdit: PropTypes.func.isRequired,
      onRemove: PropTypes.func.isRequired
    }).isRequired
  ).isRequired
};

export default Mezicasy;
