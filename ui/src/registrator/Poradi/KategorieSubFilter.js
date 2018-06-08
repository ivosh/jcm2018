import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import './KategorieSubFilter.css';

const KategorieSubFilter = ({ active, pohlavi, typ, vek, onClick }) => (
  <span className="KategorieSubFilter Bootstrap-buttons--active">
    <Button
      active={active}
      className={`KategorieSubFilter--${typ}--${active ? 'active' : 'inactive'}`}
      onClick={onClick}
    >
      <PopisekKategorie
        heightPercentage={85}
        pohlavi={pohlavi}
        showTyp={false}
        typ={typ}
        vek={vek}
      />
    </Button>
  </span>
);

KategorieSubFilter.propTypes = {
  active: PropTypes.bool,
  pohlavi: PropTypes.string,
  typ: PropTypes.string.isRequired,
  vek: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }),
  onClick: PropTypes.func.isRequired
};

export default KategorieSubFilter;
