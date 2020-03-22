import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './Cudl.css';

const Cudl = ({ text, onClick }) => (
  <Button bsStyle="primary" className="Cudl" onClick={onClick}>
    {text}
  </Button>
);

Cudl.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cudl;
