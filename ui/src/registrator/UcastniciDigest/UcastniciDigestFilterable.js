import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import DebounceInput from 'react-debounce-input';
import UcastniciDigestResponsive from './UcastniciDigestResponsive';
import './UcastniciDigestFilterable.css';

const UcastniciDigestFilterable = ({ filter, onFilterChange, ...props }) => (
  <div className="UcastniciDigestFilterable_div">
    <DebounceInput
      className="UcastniciDigestFilterable_input"
      minLength={0}
      debounceTimeout={500}
      value={filter}
      placeholder="Filtr na příjmení a jméno"
      onChange={e => onFilterChange(e.target.value)}
    />
    <span className="UcastniciDigestFilterable_span">
      Celkem: <Badge>{props.ucastniciDigest.length}</Badge>
    </span>
    <UcastniciDigestResponsive {...props} />
  </div>
);

// ucastniciDigest are simple pass-through from UcastniciDigestContainer.
UcastniciDigestFilterable.propTypes = {
  filter: PropTypes.string,
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  roky: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  ucastniciDigest: PropTypes.array.isRequired,
  fetchUcastnici: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSortDirChange: PropTypes.func.isRequired
};

export default UcastniciDigestFilterable;
