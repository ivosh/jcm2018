import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';
import InputContainer from './InputContainer';
import PlatbyTable from './PlatbyTable';
import SelectInput from './SelectInput';
import TextInput from './TextInput';

const Platby = ({ platby, predepsano, onAdd, onRemove }) => (
  <div>
    <div>Předepsané startovné:</div>
    {predepsano.map((platba, idx) => (
      <div key={idx}>
        <b>{platba.castka}</b> Kč {platba.duvod}
      </div>
    ))}

    <PlatbyTable platby={platby} onRemove={onRemove} />

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
  platby: PropTypes.arrayOf(
    PropTypes.shape({
      castka: PropTypes.number.isRequired,
      datum: PropTypes.string.isRequired,
      typ: PropTypes.string.isRequired,
      poznamka: PropTypes.string
    })
  ).isRequired,
  predepsano: PropTypes.arrayOf(
    PropTypes.shape({
      castka: PropTypes.number.isRequired,
      duvod: PropTypes.string.isRequired
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Platby;
