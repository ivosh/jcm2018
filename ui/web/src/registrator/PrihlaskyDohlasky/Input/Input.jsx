import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import './Input.css';

const Input = ({
  enabled,
  inputWidth,
  name,
  popisek,
  popisekWidth,
  options,
  showFeedback,
  validationState,
  value,
  visible,
  Type,
  inputRef,
  onChange,
  ...rest
}) =>
  visible ? (
    <FormGroup controlId={name} validationState={validationState}>
      <Col componentClass={ControlLabel} sm={popisekWidth}>
        {popisek}
      </Col>
      <Col sm={inputWidth}>
        <Type
          enabled={enabled}
          name={name}
          options={options}
          value={value}
          inputRef={inputRef}
          onChange={onChange}
          {...rest}
        />
        {showFeedback && <FormControl.Feedback className="Input_feedback" />}
      </Col>
    </FormGroup>
  ) : null;

Input.propTypes = {
  enabled: PropTypes.bool.isRequired,
  inputWidth: PropTypes.number,
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired,
  popisekWidth: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
    })
  ), // for RadioInput
  showFeedback: PropTypes.bool,
  validationState: PropTypes.string,
  value: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]).isRequired,
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

Input.defaultProps = {
  inputWidth: 9,
  options: undefined,
  popisekWidth: 3,
  showFeedback: true,
  validationState: undefined,
  value: undefined
};

export default Input;
