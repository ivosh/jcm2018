import React from 'react';
import PropTypes from 'prop-types';
import PrihlaskyDohlasky from './PrihlaskyDohlasky';

const Prihlasky = ({ match }) => (
  <PrihlaskyDohlasky
    actionPrefix="PRIHLASKY"
    match={match}
    name="Přihlášky"
    reduxName="prihlasky"
  />
);

Prihlasky.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  })
};

export default Prihlasky;
