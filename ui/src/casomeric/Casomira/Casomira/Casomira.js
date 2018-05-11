import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import { Button, Glyphicon, Panel } from 'react-bootstrap';
import PopisekKategorie from '../../../shared/Popisek/PopisekKategorie';
import RunningDisplej from '../../Displej/RunningDisplej';
import StartovniCislaContainer from '../StartovniCisla/StartovniCislaContainer';
import Mezicasy from '../Mezicas/Mezicasy';
import './Casomira.css';

const mezicasy = [
  { cas: moment.duration('PT1H23M15.67S'), startCislo: 58, onEdit: () => {}, onRemove: () => {} },
  { cas: moment.duration('PT2H15M07.32S'), startCislo: 7, onEdit: () => {}, onRemove: () => {} },
  { cas: moment.duration('PT3H52M19.02S'), onEdit: () => {}, onRemove: () => {} },
  { cas: moment.duration('PT3H52M24.19S'), startCislo: 23, onEdit: () => {}, onRemove: () => {} },
  { cas: moment.duration('PT3H52M38.02S'), onEdit: () => {}, onRemove: () => {} },
  { cas: moment.duration('PT3H52M41.19S'), startCislo: 15, onEdit: () => {}, onRemove: () => {} },
  { cas: moment.duration('PT3H52M48.02S'), startCislo: 21, onEdit: () => {}, onRemove: () => {} },
  { cas: moment.duration('PT3H52M49.19S'), startCislo: 5, onEdit: () => {}, onRemove: () => {} },
  { cas: moment.duration('PT3H52M50.02S'), startCislo: 31, onEdit: () => {}, onRemove: () => {} },
  { cas: moment.duration('PT3H52M54.19S'), startCislo: 33, onEdit: () => {}, onRemove: () => {} }
];

/* eslint-disable jsx-a11y/no-access-key */
const Casomira = ({
  accessKey,
  base,
  delta,
  mezicasEnabled,
  running,
  typ,
  onRemove,
  onStopkyMezicas
}) => (
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
    <div className="Casomira__panel-body">
      <div className="Casomira__stopky">
        <RunningDisplej base={base} delta={delta} running={running} />
        <Button
          bsStyle="info"
          className="Casomira__stopky-mezicas"
          disabled={!mezicasEnabled}
          onClick={onStopkyMezicas}
          accessKey={accessKey}
        >
          <Glyphicon glyph="time" /> (Alt-{accessKey})
        </Button>
      </div>
      <div className="Casomira__startovni-cisla">
        <StartovniCislaContainer typ={typ} />
      </div>
      <div className="Casomira__mezicasy">
        <Mezicasy mezicasy={mezicasy} />
      </div>
    </div>
  </Panel>
);
/* eslint-enable jsx-a11y/no-access-key */

Casomira.propTypes = {
  accessKey: PropTypes.string.isRequired,
  base: PropTypes.instanceOf(Date),
  delta: momentPropTypes.momentDurationObj,
  mezicasEnabled: PropTypes.bool.isRequired,
  running: PropTypes.bool.isRequired,
  typ: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onStopkyMezicas: PropTypes.func.isRequired
};

export default Casomira;
