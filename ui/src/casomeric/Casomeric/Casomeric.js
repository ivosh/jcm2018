import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import StopkyContainer from '../Stopky/StopkyContainer';
import StartujiciContainer from '../Startujici/StartujiciContainer';
import MezicasyContainer from '../Mezicasy/MezicasyContainer';

class Casomeric extends PureComponent {
  scrollToMezicas = startujiciId => {
    /* Does nothing at the moment. Some day will hopefully does. */
  };

  render = () => (
    <Panel>
      <StopkyContainer onAddMezicas={this.props.onAddMezicas} />
      <StartujiciContainer onStartujiciClick={this.scrollToMezicas} />
      <MezicasyContainer />
    </Panel>
  );
}

Casomeric.propTypes = {
  onAddMezicas: PropTypes.func.isRequired
};

export default Casomeric;
