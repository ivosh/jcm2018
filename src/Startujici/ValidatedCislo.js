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
    const startujici = this.props.startujici;

    return startujici.find(startujici => {
      return startujici.cislo === cislo;
    });
  };

  validationState = () => {
    if (this.state.cislo === '') {
      return 'success';
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
      const startujici = this.findStartujici();
      if (startujici !== undefined) {
        console.log('dispatch the action: ' + this.findStartujici().id);
      }
    }
  };

  render = () => {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="validatedCislo"
          validationState={this.validationState()}
          bsSize="small"
        >
          <FormControl
            type="text"
            value={this.state.cislo}
            placeholder="startovní číslo"
            onChange={this.handleChange}
            className="ValidatedCislo-input"
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
  ).isRequired
};

export default ValidatedCislo;
