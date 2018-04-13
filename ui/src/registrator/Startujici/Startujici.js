import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import { DragTypes } from '../../constants';
import DroppableStartujiciPanel from './DroppableStartujiciPanel';
import './Startujici.css';

const Startujici = ({ prihlaseni, odstartovani }) => (
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
    />
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
    />
  </div>
);

Startujici.propTypes = {
  prihlaseni: PropTypes.array.isRequired,
  odstartovani: PropTypes.array.isRequired
};

export default Startujici;
