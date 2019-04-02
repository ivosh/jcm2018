import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import './PoznamkyModal.css';

const PoznamkyModal = ({ id, show, onClose }) => (
  <Modal open={show} onClose={onClose} center>
    <h2>Simple centered modal</h2>
    <p>účastník: {id}</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
      hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
    </p>
  </Modal>
);

PoznamkyModal.propTypes = {
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default PoznamkyModal;
