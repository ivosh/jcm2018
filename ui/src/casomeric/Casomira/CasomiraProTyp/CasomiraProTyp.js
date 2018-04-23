import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import PopisekKategorie from '../../../shared/Popisek/PopisekKategorie';
import StartovniCisla from '../StartovniCisla/StartovniCisla';
import StopkyContainer from '../Stopky/StopkyContainer';
import MezicasyContainer from '../Mezicasy/MezicasyContainer';
import './CasomiraProTyp.css';

const CasomiraProTyp = ({ typ, onAddMezicas }) => (
  <Panel
    className={`CasomiraProTyp__panel CasomiraProTyp__panel--${typ}`}
    header={<PopisekKategorie typ={typ} />}
  >
    <StopkyContainer onAddMezicas={onAddMezicas} />
    <StartovniCisla typ={typ} />
    <MezicasyContainer />
  </Panel>
);

CasomiraProTyp.propTypes = {
  typ: PropTypes.string.isRequired,
  onAddMezicas: PropTypes.func.isRequired
};

export default CasomiraProTyp;
