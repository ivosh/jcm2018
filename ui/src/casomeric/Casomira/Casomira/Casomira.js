import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Button, Glyphicon, Panel } from 'react-bootstrap';
import PopisekKategorie from '../../../shared/Popisek/PopisekKategorie';
import RunningDisplej from '../../Displej/RunningDisplej';
import './Casomira.css';

/* eslint-disable jsx-a11y/no-access-key */
const Casomira = ({ base, delta, mezicasEnabled, running, typ, onRemove, onStopkyMezicas }) => (
  <Panel
    className={`Casomira__panel--${typ}`}
    header={
      <div className="Casomira__header">
        <PopisekKategorie typ={typ} />
        <Button className="close" onClick={onRemove}>
          <Glyphicon glyph="remove" />
        </Button>
      </div>
    }
  >
    <div className="Casomira__stopky">
      <RunningDisplej base={base} delta={delta} running={running} />
      <Button
        bsStyle="info"
        className="Casomira__stopky-mezicas"
        disabled={!mezicasEnabled}
        onClick={onStopkyMezicas}
        accessKey="m"
      >
        Mezičas (Alt-m)
      </Button>
    </div>
  </Panel>
);
/* eslint-enable jsx-a11y/no-access-key */

Casomira.propTypes = {
  base: PropTypes.instanceOf(Date),
  delta: momentPropTypes.momentDurationObj,
  mezicasEnabled: PropTypes.bool.isRequired,
  running: PropTypes.bool.isRequired,
  typ: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onStopkyMezicas: PropTypes.func.isRequired
};

export default Casomira;
