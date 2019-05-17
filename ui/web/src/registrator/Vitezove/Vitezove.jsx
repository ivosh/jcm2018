import React from 'react';
import PropTypes from 'prop-types';
import Bedna from './Bedna';
import Vitez from './Vitez';
import VitezoveFilters from './VitezoveFilters';
import './Vitezove.css';

const Vitezove = ({
  kategorieFilters,
  kategorieSubFilters,
  kategorieSubFiltersVisible,
  vitezove
}) => (
  <div className="Vitezove">
    <VitezoveFilters
      kategorieFilters={kategorieFilters}
      kategorieSubFilters={kategorieSubFilters}
      kategorieSubFiltersVisible={kategorieSubFiltersVisible}
    />
    <div className="Vitezove__bedny">
      <div className="Vitezove__misto">
        {vitezove[1] && <Vitez misto={2} vitez={vitezove[1]} />}
        <Bedna misto={2} />
      </div>
      <div className="Vitezove__misto">
        {vitezove[0] && <Vitez misto={1} vitez={vitezove[0]} />}
        <Bedna misto={1} />
      </div>
      <div className="Vitezove__misto">
        {vitezove[2] && <Vitez misto={3} vitez={vitezove[2]} />}
        <Bedna misto={3} />
      </div>
    </div>
  </div>
);

Vitezove.propTypes = {
  kategorieFilters: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      typ: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired,
  kategorieSubFilters: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      id: PropTypes.string.isRequired,
      typ: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired,
  kategorieSubFiltersVisible: PropTypes.bool.isRequired,
  vitezove: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.shape({
        den: PropTypes.number,
        mesic: PropTypes.number,
        rok: PropTypes.number.isRequired
      }).isRequired,
      kategorie: PropTypes.shape({
        typ: PropTypes.string.isRequired,
        zkratka: PropTypes.string.isRequired
      }).isRequired,
      startCislo: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool.isRequired,
      cas: PropTypes.string.isRequired,
      absPoradi: PropTypes.number.isRequired,
      relPoradi: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

export default Vitezove;
