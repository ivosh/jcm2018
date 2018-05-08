import React from 'react';
import PropTypes from 'prop-types';
import CasomiraContainer from '../Casomira/CasomiraContainer';
import './Casomiry.css';

const Casomiry = ({ casomiry, onRemove }) => (
  <div className="Casomiry__div">
    {casomiry.map(casomira => (
      <CasomiraContainer key={casomira} typ={casomira} onRemove={() => onRemove(casomira)} />
    ))}
  </div>
);

Casomiry.propTypes = {
  casomiry: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Casomiry;
