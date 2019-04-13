import React from 'react';
import { ActionPrefixes, ReduxNames } from '../../constants';
import PrihlaseniDohlaseniContainer from './PrihlaseniDohlaseniContainer';

const Dohlaseni = () => (
  <PrihlaseniDohlaseniContainer
    actionPrefix={ActionPrefixes.DOHLASENI}
    reduxName={ReduxNames.dohlaseni}
    route="dohlasky"
  />
);

export default Dohlaseni;
