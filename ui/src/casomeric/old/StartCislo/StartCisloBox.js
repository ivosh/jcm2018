import React from 'react';
import PropTypes from 'prop-types';
import './StartCisloBox.css';

const StartCisloBox = ({ cislo }) => <div className="StartCisloBox">{cislo}</div>;

StartCisloBox.propTypes = {
  cislo: PropTypes.number.isRequired
};

export default StartCisloBox;
