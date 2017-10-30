import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import StopkyConnected from '../Stopky/StopkyConnected';
import StartujiciConnected from '../Startujici/StartujiciConnected';
import MezicasyConnected from '../Mezicasy/MezicasyConnected';

class Casomeric extends Component {
  scrollToMezicas = startujiciId => {
    /* Does nothing at the moment. Some day will hopefully does. */
  };

  render = () => (
    <Panel>
      <StopkyConnected onAddMezicas={this.props.onAddMezicas} />
      <StartujiciConnected onStartujiciClick={this.scrollToMezicas} />
      <MezicasyConnected />
    </Panel>
  );
}

Casomeric.propTypes = {
  onAddMezicas: PropTypes.func.isRequired
};

export default Casomeric;