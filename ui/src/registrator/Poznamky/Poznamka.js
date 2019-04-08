import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Glyphicon } from 'react-bootstrap';
import './Poznamka.css';

const Poznamka = ({ datum, text: initialText, deletePoznamka, modifyPoznamka }) => {
  const [text, setText] = useState(initialText); // :TODO: use memoized handlers via useCallback
  const [modified, setModified] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <div className="Poznamka__header">
        <div className="Poznamka__datum">{moment.utc(datum).format('D. M. YYYY')}</div>
        <div className="Poznamka__header_icons">
          {modified && (
            <div
              className="Poznamka__save"
              onClick={() => {
                modifyPoznamka(text);
                setSaved(true);
                setModified(false);
              }}
              title="uloží poznámku"
            >
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
          className="Poznamka__textarea"
          value={text}
          rows={5}
          onBlur={() => {
            if (modified) modifyPoznamka(text);
            setSaved(true);
            setModified(false);
          }}
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
  datum: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired,
  deletePoznamka: PropTypes.func.isRequired,
  modifyPoznamka: PropTypes.func.isRequired
};

export default Poznamka;
