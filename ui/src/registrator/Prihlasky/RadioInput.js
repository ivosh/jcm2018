import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'react-bootstrap';

const RadioInput = ({ inline, name, value, options, inputRef, onChange }) =>
  options.map(option => (
    <Radio
      checked={option.key === value}
      id={option.id}
      key={option.key}
      name={name}
      inline={inline}
      value={option.key}
      inputRef={ref => inputRef(ref)}
      onChange={onChange}
    >
      {option.value}
    </Radio>
  ));

RadioInput.propTypes = {
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RadioInput;
