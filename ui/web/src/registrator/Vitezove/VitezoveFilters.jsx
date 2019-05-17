import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from 'react-bootstrap';
import KategorieFilter from '../Filterable/KategorieFilter';
import KategorieSubFilter from '../Filterable/KategorieSubFilter';
import './VitezoveFilters.css';

const VitezoveSubFilters = ({ kategorieSubFilters }) => {
  const { length } = kategorieSubFilters;
  if (length >= 6) {
    const half = length / 2;
    return (
      <div className="VitezoveFilters__sub-kategorie">
        <div>
          {kategorieSubFilters.slice(0, half).map(({ id, ...props }) => (
            <KategorieSubFilter key={id} {...props} />
          ))}
        </div>
        <div>
          {kategorieSubFilters.slice(half, length).map(({ id, ...props }) => (
            <KategorieSubFilter key={id} {...props} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="VitezoveFilters__sub-kategorie">
      {kategorieSubFilters.map(({ id, ...props }) => (
        <KategorieSubFilter key={id} {...props} />
      ))}
    </div>
  );
};

VitezoveSubFilters.propTypes = {
  kategorieSubFilters: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      id: PropTypes.string.isRequired,
      typ: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired
};

const VitezoveFilters = ({ kategorieFilters, kategorieSubFilters, kategorieSubFiltersVisible }) => (
  <div className="VitezoveFilters">
    <ButtonGroup className="VitezoveFilters__kategorie">
      {kategorieFilters.map(({ active, typ, onClick }) => (
        <KategorieFilter active={active} key={typ} typKategorie={typ} onClick={onClick} />
      ))}
    </ButtonGroup>

    {kategorieSubFiltersVisible && <VitezoveSubFilters kategorieSubFilters={kategorieSubFilters} />}
  </div>
);

VitezoveFilters.propTypes = {
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
      zkratka: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired,
  kategorieSubFiltersVisible: PropTypes.bool.isRequired
};

export default VitezoveFilters;
