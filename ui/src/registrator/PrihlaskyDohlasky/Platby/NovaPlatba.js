import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Panel } from 'react-bootstrap';
import SelectInput from '../Input/SelectInput';
import TextInput from '../Input/TextInput';
import NovaPlatbaInputContainer from './NovaPlatbaInputContainer';
import './NovaPlatba.css';

const NovaPlatba = ({ showMinified, startIndex, inputRef, onAdd, onExpand }) => {
  let index = startIndex;

  if (showMinified) {
    return (
      <Button bsStyle="primary" onClick={onExpand}>
        <Glyphicon glyph="plus" /> Nová platba
      </Button>
    );
  }

  /* eslint-disable no-plusplus */
  return (
    <Panel bsStyle="info" header="Nová platba" className="NovaPlatba">
      <NovaPlatbaInputContainer
        index={index++}
        inputRef={inputRef}
        name="novaPlatba.castka"
        popisek="částka"
        Type={TextInput}
      />
      <NovaPlatbaInputContainer
        index={index++}
        inputRef={inputRef}
        name="novaPlatba.datum"
        popisek="datum"
        Type={TextInput}
      />
      <NovaPlatbaInputContainer
        index={index++}
        inputRef={inputRef}
        name="novaPlatba.typ"
        showFeedback={false}
        popisek="jak?"
        Type={SelectInput}
      />
      <NovaPlatbaInputContainer
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
  );
  /* eslint-enable no-plusplus */
};

NovaPlatba.propTypes = {
  showMinified: PropTypes.bool,
  startIndex: PropTypes.number.isRequired,
  inputRef: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired
};

export default NovaPlatba;