import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Modal } from 'react-bootstrap';
import NovyMezicasInput from './NovyMezicasInput';

const NovyMezicas = ({
  cas,
  showing,
  validationState,
  onHide,
  onInputChange,
  onShow,
  onSubmit
}) => (
  <React.Fragment>
    <Modal keyboard={true} show={showing} onHide={onHide} bsSize="small">
      <Modal.Header closeButton={true}>
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
        <NovyMezicasInput
          cas={cas}
          validationState={validationState}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
        />
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
  cas: PropTypes.string.isRequired,
  showing: PropTypes.bool.isRequired,
  validationState: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

NovyMezicas.defaultProps = {
  validationState: undefined
};

export default NovyMezicas;
