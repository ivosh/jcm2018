import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Panel } from 'react-bootstrap';
import './Timesync.css';

const Timesync = ({ startEnabled, stopEnabled, timeOffset, onStart, onStop }) => (
  <Panel header="Synchronizace času">
    <div>Časová prodleva ze serveru: {timeOffset} ms</div>
    <ButtonToolbar className="Timesync__buttons">
      <Button bsStyle="success" disabled={!startEnabled} onClick={() => onStart()}>
        Start
      </Button>
      <Button bsStyle="warning" disabled={!stopEnabled} onClick={() => onStop()}>
        Stop
      </Button>
    </ButtonToolbar>
  </Panel>
);

Timesync.propTypes = {
  startEnabled: PropTypes.bool.isRequired,
  stopEnabled: PropTypes.bool.isRequired,
  timeOffset: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default Timesync;
