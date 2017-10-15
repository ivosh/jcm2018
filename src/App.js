import React from 'react';
import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';
import Stopky from './Stopky/Stopky';
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
            <img src={logo} className="App-logo" alt="logo" />Welcome to React
          </h1>
          <p>
            <Button
              bsStyle="success"
              bsSize="large"
              href="http://react-bootstrap.github.io/components.html"
              target="_blank"
            >
              View React Bootstrap Docs
            </Button>
          </p>
          <Stopky />
        </Grid>
      </Jumbotron>
    </div>
  );
};

export default App;
