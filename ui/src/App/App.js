import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CasomericContainer from '../casomeric/Casomeric/CasomericContainer';
import UcastniciDigestContainer from '../registrator/UcastniciDigest/UcastniciDigestContainer';
import Prihlaska from '../registrator/Prihlaska/Prihlaska';
import About from './About';
import './App.css';
import logo from './logo.svg';

const App = ({ connected }) => (
  <div>
    <Navbar inverse>
      <Navbar.Header>
        <img src={logo} className={connected ? 'App-logo-animated' : 'App-logo'} alt="logo" />
      </Navbar.Header>
      <Nav className="App-Nav">
        <LinkContainer to="/casomeric">
          <NavItem eventKey={1}>Časoměřič</NavItem>
        </LinkContainer>
        <LinkContainer to="/ucastnici">
          <NavItem eventKey={2}>Účastníci</NavItem>
        </LinkContainer>
        <LinkContainer to="/prihlaska">
          <NavItem eventKey={3}>Přihláška</NavItem>
        </LinkContainer>
        <LinkContainer to="/about">
          <NavItem eventKey={4}>O aplikaci</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
    <main>
      <Switch>
        <Route exact path="/" component={CasomericContainer} />
        <Route path="/casomeric" component={CasomericContainer} />
        <Route path="/ucastnici" component={UcastniciDigestContainer} />
        <Route path="/prihlaska" component={Prihlaska} />
        <Route path="/about" component={About} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
);

App.propTypes = {
  connected: PropTypes.bool.isRequired
};

export default App;
