import React from 'react';
import PropTypes from 'prop-types';
import CasomiraContainer from '../Casomira/CasomiraContainer';
import './Casomiry.css';

/* eslint-disable jsx-a11y/no-access-key */
const Casomiry = ({ casomiry, onRemoveCasomira }) => (
  <div className="Casomiry__div">
    {casomiry.map(({ casomira, accessKey }) => (
      <CasomiraContainer
        key={casomira}
        accessKey={accessKey}
        typ={casomira}
        onRemoveCasomira={() => onRemoveCasomira(casomira)}
      />
    ))}
  </div>
);
/* eslint-enable jsx-a11y/no-access-key */

Casomiry.propTypes = {
  casomiry: PropTypes.arrayOf(
    PropTypes.shape({
      casomira: PropTypes.string.isRequired,
      accessKey: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onRemoveCasomira: PropTypes.func.isRequired,
};

export default Casomiry;
