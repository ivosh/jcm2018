import React from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';
import UcastniciDigestResponsive from './UcastniciDigestResponsive';
import './UcastniciDigestFilterable.css';

const UcastniciDigestFilterable = ({ onFilterChange }) => (
  <div className="UcastniciDigestFilterable_div">
    <DebounceInput
      className="UcastniciDigestFilterable_input"
      minLength={0}
      debounceTimeout={500}
      placeholder="Filter na příjmení a jméno"
      onChange={e => onFilterChange(e.target.value)}
    />
    <UcastniciDigestResponsive />
  </div>
);

UcastniciDigestFilterable.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default UcastniciDigestFilterable;
