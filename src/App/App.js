import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Navbar, Jumbotron } from 'react-bootstrap';
import StopkyConnected from '../Stopky/StopkyConnected';
import MezicasyConnected from '../Mezicasy/MezicasyConnected';
import './App.css';
import logo from './logo.svg';

const App = ({ onAddMezicas }) => {
  return (
    <div>
      <Navbar inverse fixedTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Stopky</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
      <Jumbotron>
        <Grid>
          <h1>
            <img src={logo} className="App-logo" alt="logo" />Pracoviště časoměřiče
          </h1>
          <StopkyConnected onAddMezicas={onAddMezicas} />
          <MezicasyConnected />
        </Grid>
      </Jumbotron>
    </div>
  );
};

App.propTypes = {
  onAddMezicas: PropTypes.func.isRequired
};

export default App;
