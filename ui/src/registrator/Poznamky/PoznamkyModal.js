import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import PoznamkyContainer from './PoznamkyContainer';
import './PoznamkyModal.css';

const PoznamkyModal = ({ id, show, onClose }) => (
  <Modal open={show} onClose={onClose} center classNames={{ modal: 'PoznamkyModal__modal' }}>
    <h4 className="PoznamkyModal__header">Poznámky</h4>
    <div className="PoznamkyModal__content">
      <PoznamkyContainer id={id} />
    </div>
  </Modal>
);

PoznamkyModal.propTypes = {
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default PoznamkyModal;
