import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'react-bootstrap';

const RadioInput = ({ name, value, values, onChange }) =>
  values.map(one => (
    <Radio key={one} name={name} value={one} checked={one === value} onChange={onChange} inline>
      {one}
    </Radio>
  ));

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired
};

export default RadioInput;
