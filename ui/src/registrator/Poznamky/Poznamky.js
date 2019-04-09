import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import Poznamka from './Poznamka';
import './Poznamky.css';

const Poznamky = ({ poznamky, addPoznamka }) => (
  <React.Fragment>
    {poznamky.length > 0 ? (
      poznamky.map((poznamka, index) => (
        <React.Fragment key={poznamka.datum.toString()}>
          <Poznamka {...poznamka} focus={index === 0} />
        </React.Fragment>
      ))
    ) : (
      <div>Doposud žádné poznámky.</div>
    )}
    <Button bsStyle="info" onClick={addPoznamka}>
      <Glyphicon glyph="plus" /> Přidej poznámku
    </Button>
  </React.Fragment>
);

Poznamky.propTypes = {
  poznamky: PropTypes.arrayOf(
    PropTypes.shape({
      datum: PropTypes.instanceOf(Date).isRequired
    }).isRequired
  ).isRequired,
  addPoznamka: PropTypes.func.isRequired
};

export default Poznamky;
