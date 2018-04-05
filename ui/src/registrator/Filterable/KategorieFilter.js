import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import './KategorieFilter.css';

const KategorieFilter = ({ typKategorie, active, onClick }) => (
  <span className="KategorieFilter Bootstrap-buttons--active">
    <Button
      onClick={onClick}
      className={`KategorieFilter--${typKategorie}--${active ? 'active' : 'inactive'}`}
      active={active}
    >
      <PopisekKategorie typ={typKategorie} />
    </Button>
  </span>
);

KategorieFilter.propTypes = {
  typKategorie: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default KategorieFilter;
