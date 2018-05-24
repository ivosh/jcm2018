import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, FormGroup, FormControl } from 'react-bootstrap';

class NovyMezicasInput extends PureComponent {
  state = { cas: '' };

  validationState = () => {
    if (this.state.cas === '') {
      return null;
    }

    const parsed = moment.duration(this.state.cas);
    return parsed.isValid() ? 'success' : 'error';
  };

  handleChange = event => {
    this.setState({ cas: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validationState() === 'success') {
      this.props.onSubmit(moment.duration(this.state.cas).toJSON());
    }
  };

  render = () => (
    <Form inline onSubmit={this.handleSubmit} autoComplete="off">
      <FormGroup controlId="validatedCas" validationState={this.validationState()}>
        <FormControl
          type="text"
          value={this.state.cas}
          placeholder="H:MM:SS,sss"
          onChange={this.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>
    </Form>
  );
}

NovyMezicasInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NovyMezicasInput;
