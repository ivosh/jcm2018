import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const TextInput = ({ value, onChange }) => (
  <FormControl type="text" value={value} onChange={onChange} />
);

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextInput;
