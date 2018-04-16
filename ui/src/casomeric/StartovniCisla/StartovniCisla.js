import React from 'react';
import PropTypes from 'prop-types';
import { dokoncenoArr, dokoncenoStr } from '../../Util';
import Legenda from '../../shared/StartovniCislaProTyp/Legenda';
import StartovniCislaProTypContainer from '../../shared/StartovniCislaProTyp/StartovniCislaProTypContainer';
import './StartovniCisla.css';

export const Renderer = ({ id, startCislo, dokonceno }) => (
  <div className={`StartovniCislaProTyp__item Legenda-item-${dokoncenoStr(dokonceno)[0]}`} key={id}>
    {startCislo}
  </div>
);

Renderer.propTypes = {
  id: PropTypes.string,
  startCislo: PropTypes.number.isRequired,
  dokonceno: PropTypes.bool
};

const legendaOdstartovani = () =>
  dokoncenoArr.map(dokonceno => ({
    name: dokoncenoStr(dokonceno)[0],
    popisek: dokoncenoStr(dokonceno)[1]
  }));

const StartovniCisla = ({ typ }) => (
  <div className="StartovniCisla-casomeric__div">
    <StartovniCislaProTypContainer
      jenStartujici={true}
      odstartovani={true}
      typ={typ}
      renderer={Renderer}
    />
    <div className="StartovniCisla-casomeric__legenda">
      <Legenda legenda={legendaOdstartovani()} />
    </div>
  </div>
);

StartovniCisla.propTypes = {
  typ: PropTypes.string.isRequired
};

export default StartovniCisla;
