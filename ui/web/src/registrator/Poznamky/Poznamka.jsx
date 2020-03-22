import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Glyphicon } from 'react-bootstrap';
import shouldAutoFocus from '../../shouldAutoFocus';
import LoadingIndicator from '../../shared/LoadingIndicator';
import './Poznamka.css';

const Poznamka = ({ focus, datum, lines, text: initialText, deletePoznamka, modifyPoznamka }) => {
  const [text, setText] = useState(initialText);
  const [modified, setModified] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (modified) {
      setSaving(true);
      await modifyPoznamka(text);
      setSaving(false);
      setSaved(true); // :TODO: this should be ideally driven by POZNAMKA_MODIFY_SUCCESS
      setModified(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    await deletePoznamka();
    setSaving(false);
  };

  return (
    <div className="Poznamka">
      <div className="Poznamka__header">
        <div className="Poznamka__datum">{moment(datum).format('D. M. YYYY v H:MM:ss')}</div>
        <div className="Poznamka__header_icons">
          {saving && <LoadingIndicator />}
          {modified && (
            <div
              className="Poznamka__save"
              title="uloží poznámku"
              onClick={saving ? undefined : handleSave} // disable "save" if already saving
              onKeyPress={saving ? undefined : handleSave}
            >
              <Glyphicon glyph="save" />
            </div>
          )}
          {saved && (
            <div className="Poznamka__saved" title="poznámka uložena">
              <Glyphicon glyph="saved" />
            </div>
          )}
          <div
            className="Poznamka__delete"
            title="vymaže poznámku"
            onClick={saving ? undefined : handleDelete}
            onKeyPress={saving ? undefined : handleDelete}
          >
            <Glyphicon glyph="remove" />
          </div>
        </div>
      </div>
      <div className="Poznamka__text">
        <textarea
          autoFocus={focus && shouldAutoFocus()}
          className="Poznamka__textarea"
          value={text}
          rows={lines + 1}
          onBlur={handleSave}
          onChange={(event) => {
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
  modifyPoznamka: PropTypes.func.isRequired,
};

Poznamka.defaultProps = {
  focus: false,
};

export default Poznamka;
