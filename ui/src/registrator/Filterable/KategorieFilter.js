import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { barvaProTypKategorie } from '../../Util';
import './KategorieFilter.css';

const KategorieFilter = ({ typKategorie, active, onClick }) => {
  const style = {
    backgroundColor: barvaProTypKategorie(typKategorie),
    fontWeight: active ? 'bold' : '' // override style from <Button/>
  };
  return (
    <span className={`KategorieFilter_${active ? 'active' : 'nonactive'}`}>
      <Button onClick={onClick} style={style}>
        <Glyphicon glyph="filter" /> {typKategorie}
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
