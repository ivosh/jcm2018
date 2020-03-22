import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveModal from 'react-responsive-modal';
import './Modal.css';

const Modal = ({ children, header, show, onClose }) => (
  <ResponsiveModal
    open={show}
    onClose={onClose}
    center={true}
    classNames={{ modal: 'Modal__modal' }}
  >
    <h4 className="Modal__header">{header}</h4>
    <div className="Modal__content">{children}</div>
  </ResponsiveModal>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
