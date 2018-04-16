import React from 'react';
import CasomericProTypContainer from './CasomericProTyp/CasomericProTypContainer';
import './Casomeric.css';

const Casomeric = () => (
  <div className="Casomeric__div">
    <CasomericProTypContainer typ="maraton" />
    <CasomericProTypContainer typ="cyklo" />
  </div>
);

export default Casomeric;
