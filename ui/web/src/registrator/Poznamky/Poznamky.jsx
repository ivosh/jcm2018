import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import LoadingButton from '../../shared/LoadingButton';
import Poznamka from './Poznamka';
import './Poznamky.css';

const Poznamky = ({ poznamky, addPoznamka }) => {
  const [saving, setSaving] = useState(false);

  const handleAdd = async event => {
    setSaving(true);
    await addPoznamka(event);
    setSaving(false);
  };

  return (
    <>
      {poznamky.length > 0 ? (
        poznamky.map((poznamka, index) => (
          <React.Fragment key={poznamka.datum.toString()}>
            <Poznamka {...poznamka} focus={index === 0} />
          </React.Fragment>
        ))
      ) : (
        <div>Doposud žádné poznámky.</div>
      )}
      <LoadingButton
        bsStyle="info"
        disabled={saving}
        loading={saving}
        loadingText="Přidávám poznámku..."
        onClick={handleAdd}
      >
        <Glyphicon glyph="plus" /> Přidej poznámku
      </LoadingButton>
    </>
  );
};

Poznamky.propTypes = {
  poznamky: PropTypes.arrayOf(
    PropTypes.shape({
      datum: PropTypes.instanceOf(Date).isRequired
    }).isRequired
  ).isRequired,
  addPoznamka: PropTypes.func.isRequired
};

export default Poznamky;
