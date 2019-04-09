import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Glyphicon } from 'react-bootstrap';
import './Poznamka.css';

const Poznamka = ({ focus, datum, lines, text: initialText, deletePoznamka, modifyPoznamka }) => {
  const [text, setText] = useState(initialText);
  const [modified, setModified] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (modified) {
      modifyPoznamka(text);
      setSaved(true); // :TODO: this should be ideally driven by POZNAMKA_MODIFY_SUCCESS
      setModified(false);
    }
  };

  return (
    <div className="Poznamka">
      <div className="Poznamka__header">
        <div className="Poznamka__datum">{moment(datum).format('D. M. YYYY v H:MM:ss')}</div>
        <div className="Poznamka__header_icons">
          {modified && (
            <div className="Poznamka__save" onClick={save} title="uloží poznámku">
              <Glyphicon glyph="save" />
            </div>
          )}
          {saved && (
            <div className="Poznamka__saved" title="poznámka uložena">
              <Glyphicon glyph="saved" />
            </div>
          )}
          <div className="Poznamka__delete" onClick={deletePoznamka} title="vymaže poznámku">
            <Glyphicon glyph="remove" />
          </div>
        </div>
      </div>
      <div className="Poznamka__text">
        <textarea
          autoFocus={focus}
          className="Poznamka__textarea"
          value={text}
          rows={lines + 1}
          onBlur={save}
          onChange={event => {
            setText(event.target.value);
            setSaved(false);
            setModified(true);
          }}
        />
      </div>
    </div>
  );
};

Poznamka.propTypes = {
  focus: PropTypes.bool,
  datum: PropTypes.instanceOf(Date).isRequired,
  lines: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  deletePoznamka: PropTypes.func.isRequired,
  modifyPoznamka: PropTypes.func.isRequired
};

export default Poznamka;
