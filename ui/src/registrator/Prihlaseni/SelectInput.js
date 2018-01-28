import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const SelectInput = ({ name, value, options, onChange }) => (
  <FormControl componentClass="select" name={name} defaultValue={value} onChange={onChange}>
    {options.map(option => (
      <option key={option.key} value={option.key}>
        {option.value}
      </option>
    ))}
  </FormControl>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  onChange: PropTypes.func.isRequired
};

export default SelectInput;
