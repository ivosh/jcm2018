import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import StartovniCisla from '../StartovniCisla/StartovniCisla';
import StopkyContainer from '../Stopky/StopkyContainer';
import MezicasyContainer from '../Mezicasy/MezicasyContainer';

const Casomeric = ({ onAddMezicas }) => (
  <Panel>
    <StopkyContainer onAddMezicas={onAddMezicas} />
    <StartovniCisla typ="cyklo" />
    <MezicasyContainer />
  </Panel>
);

Casomeric.propTypes = {
  onAddMezicas: PropTypes.func.isRequired
};

export default Casomeric;
