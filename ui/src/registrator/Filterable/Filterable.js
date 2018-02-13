import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, ButtonGroup } from 'react-bootstrap';
import DebounceInput from 'react-debounce-input';
import { TYPY_KATEGORII } from '../../constants';
import KategorieFilter from './KategorieFilter';
import './Filterable.css';

class Filterable extends Component {
  componentDidMount = () => {
    if (process.env.NODE_ENV !== 'test') {
      this.input.focus();
    }
  };

  render = () => {
    const {
      kategorieFilter,
      numberOfItems,
      textFilter,
      onKategorieFilterChange,
      onTextFilterChange
    } = this.props;

    return (
      <div>
        <DebounceInput
          className="Filterable_input"
          debounceTimeout={500}
          minLength={0}
          placeholder="Filtr na příjmení a jméno"
          value={textFilter}
          inputRef={ref => {
            this.input = ref;
          }}
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
  };
}

Filterable.propTypes = {
  kategorieFilter: PropTypes.string,
  numberOfItems: PropTypes.number.isRequired,
  textFilter: PropTypes.string,
  onKategorieFilterChange: PropTypes.func.isRequired,
  onTextFilterChange: PropTypes.func.isRequired
};

export default Filterable;
