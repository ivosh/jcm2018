import React from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';
import UcastniciDigestResponsive from './UcastniciDigestResponsive';
import './UcastniciDigestFilterable.css';

const UcastniciDigestFilterable = ({ filter, onFilterChange }) => (
  <div className="UcastniciDigestFilterable_div">
    <DebounceInput
      className="UcastniciDigestFilterable_input"
      minLength={0}
      debounceTimeout={500}
      value={filter}
      placeholder="Filtr na příjmení a jméno"
      onChange={e => onFilterChange(e.target.value)}
    />
    <UcastniciDigestResponsive />
  </div>
);

UcastniciDigestFilterable.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired
};

export default UcastniciDigestFilterable;
