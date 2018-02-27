import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Modal } from 'react-bootstrap';
import TextInput from '../Input/TextInput';

const StartCisloInput = ({ enabled, showing, value, inputRef, onChange, onHide, onShow }) => (
  <React.Fragment>
    <TextInput enabled={enabled} value={value} inputRef={inputRef} onChange={onChange} />
    {showing ? (
      <Modal show={true} onHide={onHide} bsSize="small">
        <Modal.Header closeButton>
          <Modal.Title>Výběr startovního čísla</Modal.Title>
        </Modal.Header>
        <Modal.Body>:TODO:</Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={onHide}>
            Zavřít
          </Button>
        </Modal.Footer>
      </Modal>
    ) : (
      <Button bsStyle="info" disabled={!enabled} onClick={onShow}>
        <Glyphicon glyph="plus" /> Vybrat
      </Button>
    )}
  </React.Fragment>
);

StartCisloInput.propTypes = {
  enabled: PropTypes.bool.isRequired,
  showing: PropTypes.bool.isRequired,
  value: PropTypes.string,
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default StartCisloInput;
