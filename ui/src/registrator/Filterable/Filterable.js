import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from 'react-bootstrap';
import { TYPY_KATEGORII } from '../../constants';
import KategorieFilter from './KategorieFilter';
import TextFilter from './TextFilter';
import Zobrazeno from './Zobrazeno';
import './Filterable.css';

const Filterable = ({
  kategorieFilter,
  numberOfItems,
  textFilter,
  onKategorieFilterChange,
  onTextFilterChange
}) => (
  <div>
    <TextFilter filter={textFilter} onChange={onTextFilterChange} />

    <ButtonGroup className="Filterable__kategorie">
      {TYPY_KATEGORII.map(typKategorie => (
        <KategorieFilter
          key={typKategorie}
          typKategorie={typKategorie}
          onClick={() => onKategorieFilterChange(typKategorie)}
          active={kategorieFilter === typKategorie}
        />
      ))}
    </ButtonGroup>

    <Zobrazeno numberOfItems={numberOfItems} />
  </div>
);

Filterable.propTypes = {
  kategorieFilter: PropTypes.string,
  numberOfItems: PropTypes.number.isRequired,
  textFilter: PropTypes.string,
  onKategorieFilterChange: PropTypes.func.isRequired,
  onTextFilterChange: PropTypes.func.isRequired
};

export default Filterable;
