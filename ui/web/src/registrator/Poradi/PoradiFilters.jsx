import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from 'react-bootstrap';
import KategorieFilter from '../Filterable/KategorieFilter';
import TextFilter from '../Filterable/TextFilter';
import Zobrazeno from '../Filterable/Zobrazeno';
import KategorieSubFilter from './KategorieSubFilter';
import './PoradiFilters.css';

const PoradiSubFilters = ({ kategorieSubFilters }) => {
  const { length } = kategorieSubFilters;
  if (length >= 6) {
    const half = length / 2;
    return (
      <div className="PoradiFilters__sub-kategorie">
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
    <div className="PoradiFilters__sub-kategorie">
      {kategorieSubFilters.map(({ id, ...props }) => (
        <KategorieSubFilter key={id} {...props} />
      ))}
    </div>
  );
};

PoradiSubFilters.propTypes = {
  kategorieSubFilters: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      id: PropTypes.string.isRequired,
      typ: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired
};

const PoradiFilters = ({
  kategorieFilters,
  kategorieSubFilters,
  kategorieSubFiltersVisible,
  numberOfItems,
  textFilter,
  onTextFilterChange
}) => (
  <div className="PoradiFilters">
    <TextFilter filter={textFilter} onChange={onTextFilterChange} />

    <ButtonGroup className="PoradiFilters__kategorie">
      {kategorieFilters.map(({ active, typ, onClick }) => (
        <KategorieFilter active={active} key={typ} typKategorie={typ} onClick={onClick} />
      ))}
    </ButtonGroup>

    {kategorieSubFiltersVisible && <PoradiSubFilters kategorieSubFilters={kategorieSubFilters} />}

    <Zobrazeno numberOfItems={numberOfItems} />
  </div>
);

PoradiFilters.propTypes = {
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
  kategorieSubFiltersVisible: PropTypes.bool.isRequired,
  numberOfItems: PropTypes.number.isRequired,
  textFilter: PropTypes.string,
  onTextFilterChange: PropTypes.func.isRequired
};

PoradiFilters.defaultProps = {
  textFilter: undefined
};

export default PoradiFilters;
