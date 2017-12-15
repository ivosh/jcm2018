import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CasomericContainer from '../casomeric/Casomeric/CasomericContainer';
import UcastniciDigestFilterableContainer from '../registrator/UcastniciDigest/UcastniciDigestFilterableContainer';
import Registrace from '../registrator/Registrace/Registrace';
import './App.css';
import logo from './logo.svg';

const App = () => (
  <div>
    <Navbar inverse>
      <Navbar.Header>
        <img src={logo} className="App-logo" alt="logo" />
      </Navbar.Header>
      <Nav className="App-Nav">
        <LinkContainer to="/casomeric">
          <NavItem eventKey={1}>Časoměřič</NavItem>
        </LinkContainer>
        <LinkContainer to="/ucastnici">
          <NavItem eventKey={2}>Účastníci</NavItem>
        </LinkContainer>
        <LinkContainer to="/registrace">
          <NavItem eventKey={3}>Registrace</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
    <main>
      <Switch>
        <Route exact path="/" component={CasomericContainer} />
        <Route path="/casomeric" component={CasomericContainer} />
        <Route path="/ucastnici" component={UcastniciDigestFilterableContainer} />
        <Route path="/registrace" component={Registrace} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
);

export default App;
