import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl } from 'react-bootstrap';

class NovyMezicasInput extends PureComponent {
  handleSubmit = event => {
    event.preventDefault();
    if (this.props.validationState === 'success') {
      this.props.onSubmit(this.props.cas);
    }
  };

  render = () => {
    const { cas, validationState, onInputChange } = this.props;

    return (
      <Form inline onSubmit={this.handleSubmit} autoComplete="off">
        <FormGroup controlId="validatedCas" validationState={validationState}>
          <FormControl type="text" value={cas} placeholder="H:MM:SS,sss" onChange={onInputChange} />
          <FormControl.Feedback />
        </FormGroup>
      </Form>
    );
  };
}

NovyMezicasInput.propTypes = {
  cas: PropTypes.string.isRequired,
  validationState: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default NovyMezicasInput;
