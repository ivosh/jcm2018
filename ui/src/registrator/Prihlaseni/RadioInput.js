import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'react-bootstrap';

const RadioInput = ({ name, value, options, onChange }) =>
  options.map(option => (
    <Radio
      key={option.key}
      name={name}
      value={option.key}
      checked={option.key === value}
      onChange={onChange}
      inline
    >
      {option.value}
    </Radio>
  ));

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  onChange: PropTypes.func.isRequired
};

export default RadioInput;
