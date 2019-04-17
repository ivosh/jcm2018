import React from 'react';
import PropTypes from 'prop-types';
import './PokladnaCastek.css';

const PocetCastek = ({ popisek, pocet }) => (
  <React.Fragment>
    <div />
    <div className="PokladnaCastek--popisek">{popisek}</div>
    <div className="PokladnaCastek--pocet">{pocet}×</div>
  </React.Fragment>
);

PocetCastek.propTypes = {
  popisek: PropTypes.string.isRequired,
  pocet: PropTypes.number.isRequired
};

const PokladnaCastek = ({ counts, name }) => (
  <React.Fragment>
    <div className="PokladnaCastek--name">{name}:</div>
    <div />
    <div />
    {Object.keys(counts).map(castka => (
      <PocetCastek key={castka} popisek={`částka ${castka} Kč`} pocet={counts[castka]} />
    ))}
  </React.Fragment>
);

PokladnaCastek.propTypes = {
  counts: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  name: PropTypes.string.isRequired
};

export default PokladnaCastek;
