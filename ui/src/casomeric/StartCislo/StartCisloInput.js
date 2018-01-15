import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import './StartCisloInput.css';

class StartCisloInput extends Component {
  state = { cislo: '' };

  findStartujici = () => {
    const cislo = parseInt(this.state.cislo, 10);
    if (Number.isNaN(cislo)) {
      return undefined;
    }

    return this.props.startujici.find(startujici => startujici.cislo === cislo);
  };

  validationState = () => {
    if (this.state.cislo === '') {
      return null;
    }

    const startujici = this.findStartujici();
    if (startujici === undefined) {
      return 'error';
    } else if (startujici.dokonceno === null) {
      return 'success';
    }
    return 'warning';
  };

  handleChange = event => {
    this.setState({ cislo: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validationState() === 'success') {
      this.props.onCisloSubmitted(this.findStartujici().id);
    }
  };

  render = () => (
    <Form inline onSubmit={this.handleSubmit} autoComplete="off" className="StartCisloInput_form">
      <FormGroup controlId="validatedCislo" validationState={this.validationState()} bsSize="small">
        <FormControl
          type="text"
          value={this.state.cislo}
          placeholder=""
          onChange={this.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>
    </Form>
  );
}

StartCisloInput.propTypes = {
  startujici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cislo: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool
    }).isRequired
  ).isRequired,
  onCisloSubmitted: PropTypes.func.isRequired
};

export default StartCisloInput;
