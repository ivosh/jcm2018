import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const TextInput = ({ className, enabled, value, inputRef, onChange }) => (
  <FormControl
    type="text"
    className={className}
    disabled={!enabled}
    value={value}
    inputRef={ref => inputRef(ref)}
    onChange={onChange}
  />
);

TextInput.propTypes = {
  className: PropTypes.string,
  enabled: PropTypes.bool.isRequired,
  value: PropTypes.string,
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

TextInput.defaultProps = {
  className: undefined,
  value: undefined
};

export default TextInput;
