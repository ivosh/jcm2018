import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { barvaProTypKategorie } from '../../Util';
import './KategorieVykonuFilter.css';

const KategorieVykonuFilter = ({ typKategorie, active, onClick }) => {
  const style = {
    backgroundColor: barvaProTypKategorie(typKategorie),
    fontWeight: active ? 'bold' : '' // override style from <Button/>
  };
  return (
    <span className={`KategorieVykonuFilter_${active ? 'active' : 'nonactive'}`}>
      <Button onClick={onClick} style={style}>
        {typKategorie}
      </Button>
    </span>
  );
};

KategorieVykonuFilter.propTypes = {
  typKategorie: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default KategorieVykonuFilter;
