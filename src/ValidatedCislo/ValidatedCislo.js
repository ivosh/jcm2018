import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import './ValidatedCislo.css';

export class ValidatedCislo extends Component {
  constructor(props) {
    super(props);
    this.state = { cislo: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  findStartujici = () => {
    const cislo = parseInt(this.state.cislo, 10);
    if (isNaN(cislo)) {
      return undefined;
    }

    return this.props.startujici.find(startujici => {
      return startujici.cislo === cislo;
    });
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
    } else {
      return 'warning';
    }
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

  render = () => {
    return (
      <Form inline onSubmit={this.handleSubmit} className="ValidatedCislo-form">
        <FormGroup
          controlId="validatedCislo"
          validationState={this.validationState()}
          bsSize="small"
        >
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
  };
}

ValidatedCislo.propTypes = {
  startujici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cislo: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool
    }).isRequired
  ).isRequired,
  onCisloSubmitted: PropTypes.func.isRequired
};

export default ValidatedCislo;
