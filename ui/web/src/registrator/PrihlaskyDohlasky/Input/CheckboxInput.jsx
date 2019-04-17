import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

const CheckboxInput = ({ name, option, value, inputRef, onChange }) => (
  <Checkbox checked={value === 'on'} id={name} inputRef={ref => inputRef(ref)} onChange={onChange}>
    {option}
  </Checkbox>
);

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  option: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

CheckboxInput.defaultProps = {
  value: undefined
};

export default CheckboxInput;
