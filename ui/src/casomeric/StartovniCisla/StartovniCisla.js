import React from 'react';
import PropTypes from 'prop-types';
import { dokoncenoStr } from '../../Util';
import StartovniCislaProTypContainer from '../../shared/StartovniCislaProTyp/StartovniCislaProTypContainer';

export const Renderer = ({ startCislo, dokonceno }) => (
  <div className={`StartovniCislaProTyp__item Legenda-item-${dokoncenoStr(dokonceno)[0]}`}>
    {startCislo}
  </div>
);

Renderer.propTypes = {
  id: PropTypes.string,
  startCislo: PropTypes.number.isRequired,
  dokonceno: PropTypes.bool
};

const StartovniCisla = ({ typ }) => (
  <StartovniCislaProTypContainer
    jenStartujici={true}
    odstartovani={true}
    typ={typ}
    renderer={Renderer}
  />
);

StartovniCisla.propTypes = {
  typ: PropTypes.string.isRequired
};

export default StartovniCisla;
