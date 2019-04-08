import React from 'react';
import PropTypes from 'prop-types';
import Poznamka from './Poznamka';
import './Poznamky.css';

const Poznamky = ({ poznamky }) =>
  poznamky.length > 0 ? (
    poznamky.map((poznamka, index, array) => (
      <React.Fragment key={poznamka.datum.toString()}>
        <Poznamka {...poznamka} />
        {index < array.length - 1 && <hr className="Poznamky__hr" />}
      </React.Fragment>
    ))
  ) : (
    <div>Doposud žádné poznámky.</div>
  );

Poznamky.propTypes = {
  poznamky: PropTypes.arrayOf(
    PropTypes.shape({
      datum: PropTypes.instanceOf(Date).isRequired,
      text: PropTypes.string.isRequired,
      deletePoznamka: PropTypes.func.isRequired,
      modifyPoznamka: PropTypes.func.isRequired
    }).isRequired
  ).isRequired,
  addPoznamka: PropTypes.func.isRequired
};

export default Poznamky;
