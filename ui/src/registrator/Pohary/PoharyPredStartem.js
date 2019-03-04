import React from 'react';
import { ActionPrefixes, ReduxNames } from '../../constants';
import PoharyTableContainer from './PoharyTableContainer';

const PoharyPredStartem = () => (
  <PoharyTableContainer
    actionPrefix={ActionPrefixes.POHARY_PRED_STARTEM}
    reduxName={ReduxNames.poharyPredStartem}
  />
);

export default PoharyPredStartem;
