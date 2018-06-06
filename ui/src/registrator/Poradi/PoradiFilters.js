import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import KategorieFilter from '../Filterable/KategorieFilter';
import TextFilter from '../Filterable/TextFilter';
import Zobrazeno from '../Filterable/Zobrazeno';
import './PoradiFilters.css';

const PoradiFilters = ({
  kategorieFilters,
  kategorieSubFilters,
  numberOfItems,
  textFilter,
  onTextFilterChange
}) => (
  <div>
    <TextFilter filter={textFilter} onChange={onTextFilterChange} />

    <ButtonGroup className="PoradiFilters__kategorie">
      {kategorieFilters.map(({ active, typ, onClick }) => (
        <KategorieFilter active={active} key={typ} typKategorie={typ} onClick={onClick} />
      ))}
    </ButtonGroup>

    <ButtonGroup className="PoradiFilters__sub-kategorie">
      {kategorieSubFilters.map(({ active, kategorie, onClick }) => (
        <span
          className="PoradiFilters__sub-kategorie__item Bootstrap-buttons--active"
          key={kategorie.id}
        >
          <Button
            active={active}
            className={`PoradiFilters--${kategorie.typ}--${active ? 'active' : 'inactive'}`}
            onClick={onClick}
          >
            <PopisekKategorie {...kategorie} />
          </Button>
        </span>
      ))}
    </ButtonGroup>

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
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired,
  kategorieSubFiltersVisible: PropTypes.bool.isRequired,
  numberOfItems: PropTypes.number.isRequired,
  textFilter: PropTypes.string,
  onTextFilterChange: PropTypes.func.isRequired
};

export default PoradiFilters;
