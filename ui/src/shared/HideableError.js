import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';

class HideableError extends PureComponent {
  handleDismiss = event => {
    event.preventDefault();
    this.props.onHideError();
  };

  render = () => {
    const { code, message, title } = this.props;
    return (
      <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
        <h4>{title}</h4>
        <p>Popis: {message}</p>
        <p>Chybový kód: {code}</p>
        <p>
          <Button onClick={this.handleDismiss}>Schovat chybu</Button>
        </p>
      </Alert>
    );
  };
}

HideableError.propTypes = {
  code: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onHideError: PropTypes.func.isRequired
};

export default HideableError;
