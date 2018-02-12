import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import './Input.css';

const Input = ({
  inline,
  name,
  popisek,
  Type,
  enabled,
  options,
  validationState,
  value,
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
        onChange={onChange}
      />
      <FormControl.Feedback className="Input_feedback" />
    </Col>
  </FormGroup>
);

Input.propTypes = {
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired,
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  enabled: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ), // for RadioInput
  validationState: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Input;