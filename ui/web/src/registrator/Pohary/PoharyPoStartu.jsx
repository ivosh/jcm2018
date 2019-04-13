import React from 'react';
import { ActionPrefixes, ReduxNames } from '../../constants';
import PoharyTableContainer from './PoharyTableContainer';

const PoharyPoStartu = () => (
  <PoharyTableContainer
    actionPrefix={ActionPrefixes.POHARY_PO_STARTU}
    reduxName={ReduxNames.poharyPoStartu}
  />
);

export default PoharyPoStartu;
