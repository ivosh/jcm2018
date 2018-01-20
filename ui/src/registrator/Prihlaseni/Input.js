import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

const Input = ({ name, popisek, Type, value, options, validationState, onChange }) => (
  <FormGroup controlId={name} validationState={validationState}>
    <Col componentClass={ControlLabel} sm={3}>
      {popisek}
    </Col>
    <Col sm={9}>
      <Type name={name} value={value} options={options} onChange={onChange} />
      <FormControl.Feedback />
    </Col>
  </FormGroup>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired,
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ), // for RadioInput
  validationState: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Input;
