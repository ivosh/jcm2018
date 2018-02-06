import React from 'react';
import PropTypes from 'prop-types';
import { Badge, ButtonGroup } from 'react-bootstrap';
import DebounceInput from 'react-debounce-input';
import { TYPY_KATEGORII } from '../../constants';
import KategorieVykonuFilter from './KategorieVykonuFilter';
import './Filterable.css';

const Filterable = ({
  kategorieVykonuFilter,
  numberOfItems,
  textFilter,
  onKategorieVykonuFilterChange,
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

    <ButtonGroup className="Filterable_kategorie_vykonu">
      {TYPY_KATEGORII.map(typKategorie => (
        <KategorieVykonuFilter
          key={typKategorie}
          typKategorie={typKategorie}
          onClick={() => onKategorieVykonuFilterChange(typKategorie)}
          active={kategorieVykonuFilter === typKategorie}
        />
      ))}
    </ButtonGroup>

    <span className="Filterable_zobrazeno">
      zobrazeno: <Badge>{numberOfItems}</Badge>
    </span>
  </div>
);

Filterable.propTypes = {
  kategorieVykonuFilter: PropTypes.string,
  numberOfItems: PropTypes.number.isRequired,
  textFilter: PropTypes.string,
  onKategorieVykonuFilterChange: PropTypes.func.isRequired,
  onTextFilterChange: PropTypes.func.isRequired
};

export default Filterable;
