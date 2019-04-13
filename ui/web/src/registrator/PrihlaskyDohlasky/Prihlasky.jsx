import React from 'react';
import PropTypes from 'prop-types';
import { ActionPrefixes, ReduxNames } from '../../constants';
import PrihlaskyDohlasky from './PrihlaskyDohlasky';

const Prihlasky = ({ match }) => (
  <PrihlaskyDohlasky
    actionPrefix={ActionPrefixes.PRIHLASKY}
    match={match}
    name="Přihlášky"
    reduxName={ReduxNames.prihlasky}
  />
);

Prihlasky.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  })
};

export default Prihlasky;
