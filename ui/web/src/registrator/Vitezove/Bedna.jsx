import React from 'react';
import PropTypes from 'prop-types';
import './Bedna.css';

const computeBackgroundColor = (misto) => `rgb(${misto * 60}, ${misto * 60}, ${misto * 60})`;
const computeHeight = (misto) => `${40 - misto * 10}%`;

const Bedna = ({ misto }) => (
  <div
    className="Bedna"
    style={{
      backgroundColor: computeBackgroundColor(misto),
      height: computeHeight(misto),
    }}
  >
    <div className="Bedna__umisteni">{misto}</div>
  </div>
);

Bedna.propTypes = {
  misto: PropTypes.number.isRequired,
};

export default Bedna;
