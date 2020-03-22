import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Modal } from 'react-bootstrap';

const ErrorInModal = ({ code, message, show, title, onHide }) => (
  <Modal show={show} onHide={onHide} bsSize="large">
    <Modal.Header closeButton={true}>
      <Modal.Title>Chybka se vloudila...</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Alert bsStyle="danger">
        <h3>Chyba při {title}</h3>
        <p>Popis: {message}</p>
        <p>Chybový kód: {code}</p>
      </Alert>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Beru na vědomí</Button>
    </Modal.Footer>
  </Modal>
);

ErrorInModal.propTypes = {
  code: PropTypes.string.isRequired,
  message: PropTypes.string,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};

ErrorInModal.defaultProps = {
  message: '',
};

export default ErrorInModal;
