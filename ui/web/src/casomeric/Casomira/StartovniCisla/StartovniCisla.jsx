import React from 'react';
import PropTypes from 'prop-types';
import { dokoncene } from '../../../Util';
import StartovniCislaProTypContainer from '../../../shared/StartovniCislaProTyp/StartovniCislaProTypContainer';
import DraggableStartovniCislo from './DraggableStartovniCislo';
import DroppableLegendaItem from './DroppableLegendaItem';
import './StartovniCisla.css';

const legenda = () => Object.values(dokoncene);

const StartovniCisla = ({ typ, canDrop, onDrop }) => (
  <div className="StartovniCisla-casomeric">
    <StartovniCislaProTypContainer
      jenStartujici={true}
      odstartovani={true}
      typ={typ}
      Renderer={DraggableStartovniCislo}
    />
    <div className="StartovniCisla-casomeric__legenda">
      {legenda().map(({ name, popisek }) => (
        <DroppableLegendaItem
          key={name}
          name={name}
          popisek={popisek}
          typ={typ}
          canDrop={canDrop}
          onDrop={onDrop}
        />
      ))}
    </div>
  </div>
);

StartovniCisla.propTypes = {
  typ: PropTypes.string.isRequired,
  canDrop: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default StartovniCisla;
