import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import NovaPlatba from './NovaPlatba';
import PlatbyTable from './PlatbyTable';
import './Platby.css';

const zaplacenoStyle = (zaplaceno, predepsano) => {
  if (zaplaceno >= predepsano) {
    if (zaplaceno === 0) {
      return 'default';
    }
    return 'success';
  }
  return 'danger';
};

const Platby = ({ predepsano, provedeno, startIndex, inputRef, onAdd }) => (
  <div>
    <div className="Platby_paragraph">
      Zaplaceno:{' '}
      <Label bsStyle={zaplacenoStyle(provedeno.suma, predepsano.suma)} className="Platby_zaplaceno">
        {provedeno.suma} Kč
      </Label>
    </div>

    {predepsano.polozky.length > 0 && (
      <div className="Platby_paragraph">
        <div>Předepsané startovné:</div>
        {predepsano.polozky.map((platba, idx) => (
          <div key={idx}>
            <b>{platba.castka}</b> Kč {platba.duvod}
          </div>
        ))}
      </div>
    )}

    {provedeno.platby.length > 0 && <PlatbyTable platby={provedeno.platby} />}
    <NovaPlatba startIndex={startIndex} inputRef={inputRef} onAdd={onAdd} />
  </div>
);

Platby.propTypes = {
  predepsano: PropTypes.shape({
    polozky: PropTypes.arrayOf(
      PropTypes.shape({
        castka: PropTypes.number.isRequired,
        duvod: PropTypes.string.isRequired
      })
    ).isRequired,
    suma: PropTypes.number.isRequired
  }).isRequired,
  provedeno: PropTypes.shape({
    platby: PropTypes.arrayOf(
      PropTypes.shape({
        castka: PropTypes.number.isRequired,
        datum: PropTypes.string.isRequired,
        typ: PropTypes.string.isRequired,
        poznamka: PropTypes.string,
        onRemove: PropTypes.func.isRequired
      })
    ).isRequired,
    suma: PropTypes.number.isRequired
  }).isRequired,
  startIndex: PropTypes.number.isRequired,
  inputRef: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default Platby;
