import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import { DragTypes } from '../../constants';
import DroppableStartujiciPanel from './DroppableStartujiciPanel';
import './Startujici.css';

const Startujici = ({ prihlaseni, odstartovani, moveOdstartovan, movePrihlasen }) => (
  <div className="Startujici__div">
    <DroppableStartujiciPanel
      bsStyle="primary"
      dragType={DragTypes.STARTUJICI_PRIHLASEN}
      dropType={DragTypes.STARTUJICI_ODSTARTOVAN}
      popisek={
        <React.Fragment>
          <Glyphicon glyph="list-alt" /> Přihlášeni
        </React.Fragment>
      }
      seznam={prihlaseni}
      onDrop={moveOdstartovan}
    />
    <div className="Startujici__arrows">
      <div className="Startujici__arrow--prihlaseni">
        <Glyphicon glyph="arrow-right" />
      </div>
      <div className="Startujici__arrow--odstartovani">
        <Glyphicon glyph="arrow-left" />
      </div>
    </div>
    <DroppableStartujiciPanel
      bsStyle="success"
      dragType={DragTypes.STARTUJICI_ODSTARTOVAN}
      dropType={DragTypes.STARTUJICI_PRIHLASEN}
      popisek={
        <React.Fragment>
          <Glyphicon glyph="road" /> Odstartováni
        </React.Fragment>
      }
      seznam={odstartovani}
      onDrop={movePrihlasen}
    />
  </div>
);

Startujici.propTypes = {
  prihlaseni: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  odstartovani: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  moveOdstartovan: PropTypes.func.isRequired,
  movePrihlasen: PropTypes.func.isRequired
};

export default Startujici;
