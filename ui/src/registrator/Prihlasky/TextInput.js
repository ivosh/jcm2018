import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const TextInput = ({ enabled, value, onChange }) => (
  <FormControl type="text" disabled={!enabled} value={value} onChange={onChange} />
);

TextInput.propTypes = {
  enabled: PropTypes.bool.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextInput;
