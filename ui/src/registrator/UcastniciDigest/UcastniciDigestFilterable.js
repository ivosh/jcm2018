import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import DebounceInput from 'react-debounce-input';
import UcastniciDigestResponsive from './UcastniciDigestResponsive';
import './UcastniciDigestFilterable.css';

const UcastniciDigestFilterable = ({ textFilter, onTextFilterChange, ...props }) => (
  <div className="UcastniciDigestFilterable_div">
    <DebounceInput
      className="UcastniciDigestFilterable_input"
      minLength={0}
      debounceTimeout={500}
      value={textFilter}
      placeholder="Filtr na příjmení a jméno"
      onChange={e => onTextFilterChange(e.target.value)}
    />
    <span className="UcastniciDigestFilterable_span">
      zobrazeno: <Badge>{props.ucastniciDigest.length}</Badge>
    </span>
    <UcastniciDigestResponsive {...props} />
  </div>
);

// roky+ucastniciDigest are simple pass-through from UcastniciDigestContainer.
UcastniciDigestFilterable.propTypes = {
  roky: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  ucastniciDigest: PropTypes.array.isRequired,
  textFilter: PropTypes.string,
  isFetching: PropTypes.bool,
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  fetchUcastnici: PropTypes.func.isRequired,
  onTextFilterChange: PropTypes.func.isRequired,
  onSortDirChange: PropTypes.func.isRequired
};

export default UcastniciDigestFilterable;
