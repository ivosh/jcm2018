import React from 'react';
import PropTypes from 'prop-types';
import { findDokonceno } from '../../../Util';
import './StartovniCislo.css';

const StartovniCislo = ({ startCislo, dokonceno, connectDragSource }) =>
  connectDragSource(
    <div
      className={`StartovniCislo-casomeric StartovniCislaProTyp__item Legenda__item--${
        findDokonceno(dokonceno).name
      }`}
    >
      {startCislo}
    </div>
  );

StartovniCislo.propTypes = {
  id: PropTypes.string,
  startCislo: PropTypes.number.isRequired,
  dokonceno: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default StartovniCislo;
