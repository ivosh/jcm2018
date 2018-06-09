import React from 'react';
import PropTypes from 'prop-types';
import './PokladnaTypu.css';

const SumaTypu = ({ popisek, suma }) => (
  <React.Fragment>
    <div />
    <div>{popisek}</div>
    <div className="PokladnaTypu--suma">{suma} Kč</div>
  </React.Fragment>
);

SumaTypu.propTypes = {
  popisek: PropTypes.string.isRequired,
  suma: PropTypes.number.isRequired
};

const PokladnaTypu = ({ name, suma, ucastniku, zaloha, typy }) => (
  <React.Fragment>
    <div className="PokladnaTypu--name">{name}:</div>
    <div />
    <div />
    {Object.keys(typy).map(typ => (
      <SumaTypu key={typ} popisek={`zaplaceno ${typ}`} suma={typy[typ].suma} />
    ))}
    <SumaTypu popisek="celkem" suma={suma} />
    {zaloha && <SumaTypu popisek="z toho záloha" suma={zaloha.suma} />}
    <div />
    <div>účastníků</div>
    <div className="PokladnaTypu--ucastniku">{ucastniku}</div>
  </React.Fragment>
);

PokladnaTypu.propTypes = {
  name: PropTypes.string.isRequired,
  suma: PropTypes.number.isRequired,
  ucastniku: PropTypes.number.isRequired,
  zaloha: PropTypes.shape({
    count: PropTypes.number.isRequired,
    suma: PropTypes.number.isRequired
  }),
  typy: PropTypes.object
};

export default PokladnaTypu;
