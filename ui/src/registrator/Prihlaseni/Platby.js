import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label, Panel } from 'react-bootstrap';
import InputContainer from './InputContainer';
import PlatbyTable from './PlatbyTable';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
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

const Platby = ({ predepsano, provedeno, onAdd, onRemove }) => (
  <div>
    <p>
      Zaplaceno:{' '}
      <Label bsStyle={zaplacenoStyle(provedeno.suma, predepsano.suma)} className="Platby_zaplaceno">
        {provedeno.suma} Kč
      </Label>
    </p>

    {predepsano.polozky.length > 0 && (
      <p>
        <div>Předepsané startovné:</div>
        {predepsano.polozky.map((platba, idx) => (
          <div key={idx}>
            <b>{platba.castka}</b> Kč {platba.duvod}
          </div>
        ))}
      </p>
    )}

    {provedeno.platby.length > 0 && <PlatbyTable platby={provedeno.platby} onRemove={onRemove} />}

    <Panel bsStyle="info" header="Nová platba">
      <InputContainer name="novaPlatba.castka" popisek="částka" Type={TextInput} />
      <InputContainer name="novaPlatba.datum" popisek="datum" Type={TextInput} />
      <InputContainer name="novaPlatba.typ" popisek="jak?" Type={SelectInput} />
      <InputContainer name="novaPlatba.poznamka" popisek="poznámka" Type={TextInput} />
      <Button bsStyle="primary" bsSize="small" onClick={onAdd}>
        Přidat
      </Button>
    </Panel>
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
        poznamka: PropTypes.string
      })
    ).isRequired,
    suma: PropTypes.number.isRequired
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Platby;
