import React from 'react';
import PropTypes from 'prop-types';
import { Badge, ButtonGroup } from 'react-bootstrap';
import DebounceInput from 'react-debounce-input';
import { TYPY_KATEGORII } from '../../constants';
import KategorieVykonuFilter from './KategorieVykonuFilter';
import UcastniciDigestTable from './UcastniciDigestTable';
import './UcastniciDigestFilterable.css';

const UcastniciDigestFilterable = ({
  kategorieVykonuFilter,
  textFilter,
  onKategorieVykonuFilterChange,
  onTextFilterChange,
  ...props
}) => (
  <div className="UcastniciDigestFilterable_div">
    <DebounceInput
      className="UcastniciDigestFilterable_input"
      minLength={0}
      debounceTimeout={500}
      value={textFilter}
      placeholder="Filtr na příjmení a jméno"
      onChange={e => onTextFilterChange(e.target.value)}
    />

    <ButtonGroup className="UcastniciDigestFilterable_kategorie_vykonu">
      {TYPY_KATEGORII.map(typKategorie => (
        <KategorieVykonuFilter
          key={typKategorie}
          typKategorie={typKategorie}
          onClick={() => onKategorieVykonuFilterChange(typKategorie)}
          active={kategorieVykonuFilter === typKategorie}
        />
      ))}
    </ButtonGroup>

    <span className="UcastniciDigestFilterable_zobrazeno">
      zobrazeno: <Badge>{props.ucastniciDigest.length}</Badge>
    </span>

    <UcastniciDigestTable {...props} />
  </div>
);

// roky+ucastniciDigest are simple pass-through from UcastniciDigestContainer.
UcastniciDigestFilterable.propTypes = {
  roky: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  ucastniciDigest: PropTypes.array.isRequired,
  fetching: PropTypes.bool,
  kategorieVykonuFilter: PropTypes.string,
  textFilter: PropTypes.string,
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  fetchUcastnici: PropTypes.func.isRequired,
  onKategorieVykonuFilterChange: PropTypes.func.isRequired,
  onTextFilterChange: PropTypes.func.isRequired,
  onSortDirChange: PropTypes.func.isRequired
};

export default UcastniciDigestFilterable;
