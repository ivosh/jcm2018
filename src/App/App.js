import React from 'react';
import { Grid, Navbar, Jumbotron } from 'react-bootstrap';
import Stopky from '../Stopky/Stopky';
import Mezicasy from '../Mezicasy/Mezicasy';
import './App.css';
import logo from './logo.svg';

const App = () => {
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
          <Stopky />
          <Mezicasy />
        </Grid>
      </Jumbotron>
    </div>
  );
};

export default App;
