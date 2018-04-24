import React from 'react';
import StopkyProTypContainer from './StopkyProTyp/StopkyProTypContainer';
import './Stopky.css';

const Stopky = () => (
  <div className="Stopky__div">
    <div className="Stopky__panel">
      <StopkyProTypContainer typ="maraton" />
    </div>
    <div className="Stopky__panel">
      <StopkyProTypContainer typ="půlmaraton" />
    </div>
    <div className="Stopky__panel">
      <StopkyProTypContainer typ="cyklo" />
    </div>
    <div className="Stopky__panel">
      <StopkyProTypContainer typ="koloběžka" />
    </div>
  </div>
);

export default Stopky;
