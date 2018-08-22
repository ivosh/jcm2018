import React from 'react';
import PropTypes from 'prop-types';
import { DOHLASKY } from '../../constants';
import PrihlaskyDohlasky from './PrihlaskyDohlasky';

const Dohlasky = ({ match }) => (
  <PrihlaskyDohlasky actionPrefix={DOHLASKY} match={match} name="Dohlášky" reduxName="dohlasky" />
);

Dohlasky.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  })
};

export default Dohlasky;
