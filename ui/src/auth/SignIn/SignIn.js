import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ControlLabel, Form, FormGroup, FormControl, Panel } from 'react-bootstrap';
import HideableError from '../../shared/HideableError';
import LoadingIndicator from '../../shared/LoadingIndicator';
import './SignIn.css';

class SignIn extends Component {
  state = { username: '', password: '' };

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.username, this.state.password);
  };

  render = () => {
    const { signingIn, errorCode, errorMessage, showError, onHideError } = this.props;
    return (
      <div className="SignIn_div">
        <Panel bsStyle="primary" header="Přihlášení do aplikace JCM">
          <Form inline onSubmit={this.handleSubmit} autoComplete="off" className="SignIn_form">
            <FormGroup controlId="username">
              <ControlLabel>Jméno</ControlLabel>{' '}
              <FormControl
                type="text"
                value={this.state.username}
                placeholder="uživatelské jméno"
                onChange={this.handleUsernameChange}
              />
            </FormGroup>
            <span className="SignIn_spacing" />
            <FormGroup controlId="password">
              <ControlLabel>Heslo</ControlLabel>{' '}
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="heslo"
                onChange={this.handlePasswordChange}
              />
            </FormGroup>
            <span className="SignIn_spacing" />
            <FormGroup>
              <Button type="submit" bsStyle="success">
                Přihlásit
              </Button>
            </FormGroup>
          </Form>
        </Panel>
        {signingIn && (
          <div>
            <LoadingIndicator /> Probíhá přihlašování...
          </div>
        )}
        {showError && (
          <HideableError
            code={errorCode}
            message={errorMessage}
            title="Chyba při přihlášení!"
            onHideError={onHideError}
          />
        )}
      </div>
    );
  };
}

SignIn.propTypes = {
  signingIn: PropTypes.bool.isRequired,
  errorCode: PropTypes.string,
  errorMessage: PropTypes.string,
  showError: PropTypes.bool,
  onHideError: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SignIn;
