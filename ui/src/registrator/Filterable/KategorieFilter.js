import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { barvaProTypKategorie } from '../../Util';
import PopisekKategorie from '../../shared/PopisekKategorie/PopisekKategorie';
import './KategorieFilter.css';

const KategorieFilter = ({ typKategorie, active, onClick }) => {
  const style = {
    backgroundColor: barvaProTypKategorie(typKategorie, active ? '1.0' : '0.5')
  };

  return (
    <span className="KategorieFilter">
      <Button onClick={onClick} style={style} active={active}>
        <PopisekKategorie typ={typKategorie} />
      </Button>
    </span>
  );
};

KategorieFilter.propTypes = {
  typKategorie: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default KategorieFilter;
