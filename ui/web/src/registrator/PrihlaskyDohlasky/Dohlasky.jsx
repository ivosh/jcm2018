import React from 'react';
import PropTypes from 'prop-types';
import { ActionPrefixes, ReduxNames } from '../../constants';
import PrihlaskyDohlasky from './PrihlaskyDohlasky';

const Dohlasky = ({ match }) => (
  <PrihlaskyDohlasky
    actionPrefix={ActionPrefixes.DOHLASKY}
    match={match}
    name="Dohlášky"
    reduxName={ReduxNames.dohlasky}
  />
);

Dohlasky.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Dohlasky;
