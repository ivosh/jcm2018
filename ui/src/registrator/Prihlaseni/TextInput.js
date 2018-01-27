import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const TextInput = ({ enabled, value, onChange }) => (
  <FormControl type="text" value={value} onChange={onChange} disabled={!enabled} />
);

TextInput.propTypes = {
  enabled: PropTypes.bool.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextInput;
