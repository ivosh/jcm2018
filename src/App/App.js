import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import StopkyConnected from '../Stopky/StopkyConnected';
import StartujiciConnected from '../Startujici/StartujiciConnected';
import MezicasyConnected from '../Mezicasy/MezicasyConnected';
import './App.css';
import logo from './logo.svg';

class App extends Component {
  scrollToMezicas = startujiciId => {
    /* Does nothing at the moment. Some day will hopefully does. */
  };

  render = () => (
    <div>
      <h1 className="App-header">
        <img src={logo} className="App-logo" alt="logo" />Pracoviště časoměřiče
      </h1>
      <Panel>
        <StopkyConnected onAddMezicas={this.props.onAddMezicas} />
        <StartujiciConnected onStartujiciClick={this.scrollToMezicas} />
        <MezicasyConnected />
      </Panel>
    </div>
  );
}

App.propTypes = {
  onAddMezicas: PropTypes.func.isRequired
};

export default App;
