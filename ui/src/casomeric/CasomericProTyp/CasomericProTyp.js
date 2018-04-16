import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import StartovniCisla from '../StartovniCisla/StartovniCisla';
import StopkyContainer from '../Stopky/StopkyContainer';
import MezicasyContainer from '../Mezicasy/MezicasyContainer';

const CasomericProTyp = ({ typ, onAddMezicas }) => (
  <Panel>
    <StopkyContainer onAddMezicas={onAddMezicas} />
    <StartovniCisla typ={typ} />
    <MezicasyContainer />
  </Panel>
);

CasomericProTyp.propTypes = {
  typ: PropTypes.string.isRequired,
  onAddMezicas: PropTypes.func.isRequired
};

export default CasomericProTyp;
