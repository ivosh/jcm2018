import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const TextInput = ({ enabled, value, inputRef, onChange }) => (
  <FormControl
    type="text"
    disabled={!enabled}
    value={value}
    inputRef={ref => inputRef(ref)}
    onChange={onChange}
  />
);

TextInput.propTypes = {
  enabled: PropTypes.bool.isRequired,
  value: PropTypes.string,
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextInput;
