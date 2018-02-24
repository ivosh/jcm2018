import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import './Input.css';

const Input = ({
  enabled,
  inline,
  name,
  popisek,
  options,
  validationState,
  value,
  Formatter,
  Type,
  inputRef,
  onChange
}) => (
  <FormGroup controlId={name} validationState={validationState}>
    <Col componentClass={ControlLabel} sm={3}>
      {popisek}
    </Col>
    <Col sm={9}>
      <Type
        enabled={enabled}
        inline={inline}
        name={name}
        options={options}
        value={value}
        Formatter={Formatter}
        inputRef={inputRef}
        onChange={onChange}
      />
      <FormControl.Feedback className="Input_feedback" />
    </Col>
  </FormGroup>
);

Input.propTypes = {
  enabled: PropTypes.bool.isRequired,
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
    })
  ), // for RadioInput
  validationState: PropTypes.string,
  value: PropTypes.string,
  Formatter: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
