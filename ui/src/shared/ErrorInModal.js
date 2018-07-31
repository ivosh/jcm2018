import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Modal } from 'react-bootstrap';

const ErrorInModal = ({ code, message, show = false, title, onHide }) => (
  <Modal show={show} onHide={onHide} bsSize="small">
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Alert bsStyle="danger">
        <h4>{title}</h4>
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
  code: PropTypes.string,
  message: PropTypes.string,
  show: PropTypes.bool,
  title: PropTypes.string,
  onHide: PropTypes.func.isRequired
};

export default ErrorInModal;
