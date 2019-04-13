import React from 'react';
import PrihlaseniDohlaseniContainer from './PrihlaseniDohlaseniContainer';
import { ActionPrefixes, ReduxNames } from '../../constants';

const Prihlaseni = () => (
  <PrihlaseniDohlaseniContainer
    actionPrefix={ActionPrefixes.PRIHLASENI}
    reduxName={ReduxNames.prihlaseni}
    route="prihlasky"
  />
);

export default Prihlaseni;
