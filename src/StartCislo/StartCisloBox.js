import React from 'react';
import PropTypes from 'prop-types';
import './StartCisloBox.css';

const StartCisloBox = ({ cislo }) => <span className="StartCisloBox">{cislo}</span>;

StartCisloBox.propTypes = {
  cislo: PropTypes.number.isRequired
};

export default StartCisloBox;
