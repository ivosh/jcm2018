import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import './KategorieSubFilter.css';

const KategorieSubFilter = ({ active, pohlavi, typ, vek, zkratka, onClick }) => (
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
        zkratka={zkratka}
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
  zkratka: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

KategorieSubFilter.defaultProps = {
  active: false,
  pohlavi: undefined,
  vek: undefined
};

export default KategorieSubFilter;
