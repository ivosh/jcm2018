import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import './KategorieFilter.css';

const KategorieFilter = ({ active, typKategorie, onClick }) => (
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
  active: PropTypes.bool,
  typKategorie: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

KategorieFilter.defaultProps = {
  active: false
};

export default KategorieFilter;
