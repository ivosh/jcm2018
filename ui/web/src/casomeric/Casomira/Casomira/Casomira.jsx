import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Button, Glyphicon } from 'react-bootstrap';
import MezicasyContainer from '../Mezicas/MezicasyContainer';
import NovyMezicasContainer from '../NovyMezicas/NovyMezicasContainer';
import PopisekKategorie from '../../../shared/Popisek/PopisekKategorie';
import RunningDisplej from '../../Displej/RunningDisplej';
import StartovniCislaContainer from '../StartovniCisla/StartovniCislaContainer';
import './Casomira.css';

/* eslint-disable jsx-a11y/no-access-key */
const Casomira = ({
  accessKey,
  base,
  delta,
  mezicasEnabled,
  running,
  typ,
  onRemoveCasomira,
  onStopkyAddMezicas,
}) => (
  /* Do not use Bootstrap's Panel here. It screws AutoResizer's height. */
  <div className="Casomira__panel">
    <div className={`Casomira__header Casomira__header--${typ}`}>
      <PopisekKategorie typ={typ} />
      <Button className="close" onClick={onRemoveCasomira}>
        <Glyphicon glyph="remove" />
      </Button>
    </div>
    <div className="Casomira__body">
      <div className="Casomira__stopky">
        <RunningDisplej base={base} delta={delta} running={running} />
        <Button
          bsStyle="info"
          className="Casomira__stopky-mezicas"
          disabled={!mezicasEnabled}
          onClick={onStopkyAddMezicas}
          accessKey={accessKey}
        >
          <Glyphicon glyph="time" /> (Alt-
          {accessKey})
        </Button>
        <div className="Casomira__stopky-novy-mezicas">
          <NovyMezicasContainer typ={typ} />
        </div>
      </div>
      <div className="Casomira__startovni-cisla">
        <StartovniCislaContainer typ={typ} />
      </div>
      <div className="Casomira__mezicasy">
        <MezicasyContainer typ={typ} />
      </div>
    </div>
  </div>
);
/* eslint-enable jsx-a11y/no-access-key */

Casomira.propTypes = {
  accessKey: PropTypes.string.isRequired,
  base: PropTypes.instanceOf(Date),
  delta: momentPropTypes.momentDurationObj,
  mezicasEnabled: PropTypes.bool.isRequired,
  running: PropTypes.bool.isRequired,
  typ: PropTypes.string.isRequired,
  onRemoveCasomira: PropTypes.func.isRequired,
  onStopkyAddMezicas: PropTypes.func.isRequired,
};

Casomira.defaultProps = {
  base: undefined,
  delta: undefined,
};

export default Casomira;
