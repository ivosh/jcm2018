import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'react-bootstrap';

const RadioInput = ({ inline, name, value, options, Formatter, inputRef, onChange }) =>
  options.map(option => (
    <Radio
      checked={option.key === value}
      id={option.id}
      inline={inline}
      key={option.key}
      name={name}
      nonce={option.startovne} // uses an existing atribute of HTMLElement
      value={option.key}
      inputRef={ref => inputRef(ref)}
      onChange={onChange}
    >
      {Formatter ? <Formatter {...option.value} /> : option.value}
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
      startovne: PropTypes.number,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
    })
  ),
  inputRef: PropTypes.func.isRequired,
  Formatter: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  onChange: PropTypes.func.isRequired
};

export default RadioInput;
