import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import shouldAutoFocus from '../../../shouldAutoFocus';

const NovyMezicasInput = ({ cas, validationState, onInputChange, onSubmit }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (shouldAutoFocus()) {
      inputRef.current.focus();
    }
  });

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      if (validationState === 'success') {
        onSubmit(cas);
      }
    },
    [cas, validationState, onSubmit]
  );

  return (
    <Form inline={true} onSubmit={handleSubmit} autoComplete="off">
      <FormGroup controlId="validatedCas" validationState={validationState}>
        <FormControl
          type="text"
          value={cas}
          placeholder="H:MM:SS,sss"
          inputRef={inputRef}
          onChange={onInputChange}
        />
        <FormControl.Feedback />
      </FormGroup>
    </Form>
  );
};

NovyMezicasInput.propTypes = {
  cas: PropTypes.string.isRequired,
  validationState: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

NovyMezicasInput.defaultProps = {
  validationState: undefined
};

export default NovyMezicasInput;
