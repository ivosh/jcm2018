import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Modal } from 'react-bootstrap';
import NovyMezicasInput from './NovyMezicasInput';

const NovyMezicas = ({ showing, onHide, onShow, onSubmit }) => (
  <React.Fragment>
    <Modal keyboard={true} show={showing} onHide={onHide} bsSize="small">
      <Modal.Header closeButton>
        <Modal.Title>Nový mezičas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Přidá nový mezičas ve tvaru <code>H:MM:SS,sss</code>. Nepřidávej duplicitní mezičas,
          nejsme na to ještě zařízeni.
        </p>
        <p>
          Po každém zadání času stiskni <code>Enter</code>; nakonec pak <code>Esc</code>.
        </p>
        <NovyMezicasInput onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
    {!showing && (
      <Button bsStyle="primary" onClick={onShow}>
        <Glyphicon glyph="plus" />
      </Button>
    )}
  </React.Fragment>
);

NovyMezicas.propTypes = {
  showing: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default NovyMezicas;
