import React from 'react';
import PropTypes from 'prop-types';
import { dokoncenoStr } from '../../../Util';

const StartovniCislo = ({ startCislo, dokonceno, connectDragSource }) =>
  connectDragSource(
    <div className={`StartovniCislaProTyp__item Legenda-item-${dokoncenoStr(dokonceno)[0]}`}>
      {startCislo}
    </div>
  );

StartovniCislo.propTypes = {
  id: PropTypes.string,
  startCislo: PropTypes.number.isRequired,
  dokonceno: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default StartovniCislo;
