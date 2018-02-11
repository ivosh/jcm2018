import React from 'react';
import PropTypes from 'prop-types';
import { Badge, ButtonGroup } from 'react-bootstrap';
import DebounceInput from 'react-debounce-input';
import { TYPY_KATEGORII } from '../../constants';
import KategorieFilter from './KategorieFilter';
import './Filterable.css';

const Filterable = ({
  kategorieFilter,
  numberOfItems,
  textFilter,
  onKategorieFilterChange,
  onTextFilterChange
}) => (
  <div>
    <DebounceInput
      className="Filterable_input"
      minLength={0}
      debounceTimeout={500}
      value={textFilter}
      placeholder="Filtr na příjmení a jméno"
      onChange={e => onTextFilterChange(e.target.value)}
    />

    <ButtonGroup className="Filterable_kategorie">
      {TYPY_KATEGORII.map(typKategorie => (
        <KategorieFilter
          key={typKategorie}
          typKategorie={typKategorie}
          onClick={() => onKategorieFilterChange(typKategorie)}
          active={kategorieFilter === typKategorie}
        />
      ))}
    </ButtonGroup>

    <span className="Filterable_zobrazeno">
      zobrazeno: <Badge>{numberOfItems}</Badge>
    </span>
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
