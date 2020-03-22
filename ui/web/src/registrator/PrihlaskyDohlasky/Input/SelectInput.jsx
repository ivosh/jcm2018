import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const SelectInput = ({ name, options, value, inputRef, onChange }) => (
  <FormControl
    componentClass="select"
    defaultValue={value}
    name={name}
    inputRef={(ref) => inputRef(ref)}
    onChange={onChange}
  >
    {options.map((option) => (
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
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

SelectInput.defaultProps = {
  value: undefined,
};

export default SelectInput;
