import React from 'react';
import CasomiraProTypContainer from './CasomiraProTyp/CasomiraProTypContainer';
import './Casomira.css';

const Casomira = () => (
  <div className="Casomira__div">
    <CasomiraProTypContainer typ="maraton" />
    <CasomiraProTypContainer typ="cyklo" />
  </div>
);

export default Casomira;
