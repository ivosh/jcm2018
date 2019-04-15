import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, Form, FormGroup, FormControl, Panel } from 'react-bootstrap';
import LoadingButton from '../../shared/LoadingButton';
import './SignIn.css';

class SignIn extends PureComponent {
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
    const { signingIn } = this.props;
    return (
      <div className="SignIn_div">
        <Panel bsStyle="primary" header="Přihlášení do aplikace JCM" className="SignIn_panel">
          <Form
            inline={true}
            onSubmit={this.handleSubmit}
            autoComplete="off"
            className="SignIn_form"
          >
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
              <LoadingButton
                type="submit"
                bsStyle="success"
                loading={signingIn}
                loadingText="Probíhá přihlašování..."
              >
                Přihlásit
              </LoadingButton>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  };
}

SignIn.propTypes = {
  signingIn: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SignIn;
