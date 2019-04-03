import React from 'react';
import PropTypes from 'prop-types';
import Poznamka from './Poznamka';
import './Poznamky.css';

const Poznamky = ({ poznamky }) =>
  poznamky.length > 0 ? (
    poznamky.map(({ datum, text }, index, array) => (
      <React.Fragment key={datum.toString()}>
        <Poznamka datum={datum} text={text} />
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
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Poznamky;
