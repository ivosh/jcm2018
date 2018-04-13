import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { DragTypes } from '../../constants';
import DraggableJedenStartujici from './DraggableJedenStartujici';
import './StartujiciPanel.css';

const StartujiciPanel = ({ bsStyle, connectDropTarget, dragType, isOver, popisek, seznam }) =>
  connectDropTarget(
    <div>
      <Panel
        bsStyle={bsStyle}
        header={popisek}
        className={isOver ? 'StartujiciPanel--isOver' : 'StartujiciPanel--isNotOver'}
      >
        <div className="StartujiciPanel__grid">
          <div className="StartujiciPanel__header">příjmení</div>
          <div className="StartujiciPanel__leftHeader">jméno</div>
          <div className="StartujiciPanel__middleHeader">narození</div>
          <div className="StartujiciPanel__middleHeader">kategorie</div>
          <div className="StartujiciPanel__header">číslo</div>
          {seznam.map(jeden => (
            <DraggableJedenStartujici key={jeden.id} dragType={dragType} {...jeden} />
          ))}
        </div>
      </Panel>
    </div>
  );

StartujiciPanel.propTypes = {
  bsStyle: PropTypes.string.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  dragType: PropTypes.oneOf([DragTypes.STARTUJICI_PRIHLASEN, DragTypes.STARTUJICI_ODSTARTOVAN])
    .isRequired,
  isOver: PropTypes.bool.isRequired,
  popisek: PropTypes.any.isRequired,
  seznam: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.shape({
        rok: PropTypes.number.isRequired
      }).isRequired,
      kategorie: PropTypes.shape({
        typ: PropTypes.string.isRequired
      }).isRequired,
      startCislo: PropTypes.number
    })
  ).isRequired
};

export default StartujiciPanel;
