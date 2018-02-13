import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Label, Panel } from 'react-bootstrap';
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

const Platby = ({ predepsano, provedeno, startIndex, inputRef, onAdd }) => {
  let index = startIndex;

  /* eslint-disable no-plusplus */
  return (
    <div>
      <div className="Platby_paragraph">
        Zaplaceno:{' '}
        <Label
          bsStyle={zaplacenoStyle(provedeno.suma, predepsano.suma)}
          className="Platby_zaplaceno"
        >
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

      <Panel bsStyle="info" header="Nová platba" className="Platby_nova_platba">
        <InputContainer
          index={index++}
          inputRef={inputRef}
          name="novaPlatba.castka"
          popisek="částka"
          Type={TextInput}
        />
        <InputContainer
          index={index++}
          inputRef={inputRef}
          name="novaPlatba.datum"
          popisek="datum"
          Type={TextInput}
        />
        <InputContainer
          index={index++}
          inputRef={inputRef}
          name="novaPlatba.typ"
          popisek="jak?"
          Type={SelectInput}
        />
        <InputContainer
          index={index++}
          inputRef={inputRef}
          name="novaPlatba.poznamka"
          popisek="poznámka"
          Type={TextInput}
        />
        <Button bsStyle="primary" bsSize="small" onClick={onAdd}>
          <Glyphicon glyph="plus" /> Přidat
        </Button>
      </Panel>
    </div>
  );
  /* eslint-enable no-plusplus */
};

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
