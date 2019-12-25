import React from 'react';
import PropTypes from 'prop-types';
import './PokladnaTypu.css';

const SumaTypu = ({ popisek, suma }) => (
  <>
    <div />
    <div>{popisek}</div>
    <div className="PokladnaTypu--suma">{suma} Kč</div>
  </>
);

SumaTypu.propTypes = {
  popisek: PropTypes.string.isRequired,
  suma: PropTypes.number.isRequired
};

const PokladnaTypu = ({ name, odstartovano, suma, ucastniku, zaloha, typy }) => (
  <>
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
    {odstartovano !== ucastniku && (
      <>
        <div />
        <div className="PokladnaTypu--neodstartovalo">neodstartovalo</div>
        <div className="PokladnaTypu--neodstartovalo_pocet">{ucastniku - odstartovano}</div>
      </>
    )}
  </>
);

PokladnaTypu.propTypes = {
  name: PropTypes.string.isRequired,
  odstartovano: PropTypes.number.isRequired,
  suma: PropTypes.number.isRequired,
  ucastniku: PropTypes.number.isRequired,
  zaloha: PropTypes.shape({
    suma: PropTypes.number.isRequired
  }),
  typy: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

PokladnaTypu.defaultProps = {
  zaloha: undefined
};

export default PokladnaTypu;
