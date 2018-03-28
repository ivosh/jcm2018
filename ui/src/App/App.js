import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import withAuth from '../auth/withAuth';
import withoutAuth from '../auth/withoutAuth';
import SignInContainer from '../auth/SignIn/SignInContainer';
import CasomericContainer from '../casomeric/Casomeric/CasomericContainer';
import withFetchUcastnici from '../entities/withFetchUcastnici/withFetchUcastnici';
import UcastniciDigestContainer from '../registrator/UcastniciDigest/UcastniciDigestContainer';
import Prihlasky from '../registrator/Prihlasky/Prihlasky';
import StartujiciContainer from '../registrator/Startujici/StartujiciContainer';
import PrihlaseniContainer from '../registrator/Prihlaseni/PrihlaseniContainer';
import UbytovaniContainer from '../registrator/Ubytovani/UbytovaniContainer';
import SignOutContainer from '../auth/SignOut/SignOutContainer';
import About from './About';
import './App.css';
import logo from './logo.svg';

const App = ({ authenticated, connected, username }) => (
  <div className="App-div">
    <Navbar inverse>
      <Navbar.Header>
        <img src={logo} className={connected ? 'App-logo-animated' : 'App-logo'} alt="logo" />
      </Navbar.Header>
      {authenticated && (
        <Nav className="App-Nav">
          <LinkContainer key="casomeric" to="/casomeric">
            <NavItem eventKey={1}>
              <Glyphicon glyph="time" /> Časoměřič
            </NavItem>
          </LinkContainer>
          <LinkContainer key="ucastnici" to="/ucastnici">
            <NavItem eventKey={2}>
              <Glyphicon glyph="list" /> Účastníci
            </NavItem>
          </LinkContainer>
          <LinkContainer key="prihlasky" to="/prihlasky">
            <NavItem eventKey={3}>
              <Glyphicon glyph="edit" /> Přihlášky
            </NavItem>
          </LinkContainer>
          <LinkContainer key="prihlaseni" to="/prihlaseni">
            <NavItem eventKey={4}>
              <Glyphicon glyph="list-alt" /> Přihlášeni
            </NavItem>
          </LinkContainer>
          <LinkContainer key="startujici" to="/startujici">
            <NavItem eventKey={5}>
              <Glyphicon glyph="sound-5-1" /> Startující
            </NavItem>
          </LinkContainer>
          <LinkContainer key="ubytovani" to="/ubytovani">
            <NavItem eventKey={6}>
              <Glyphicon glyph="bed" /> Ubytovaní
            </NavItem>
          </LinkContainer>
        </Nav>
      )}
      <Nav className="App-Nav" pullRight>
        {!authenticated && (
          <LinkContainer to="/signin">
            <NavItem eventKey={7}>
              <Glyphicon glyph="log-in" /> Přihlášení
            </NavItem>
          </LinkContainer>
        )}
        {authenticated && (
          <LinkContainer key="signout" to="/signout">
            <NavItem eventKey={8}>
              <Glyphicon glyph="log-out" /> Odhlášení
            </NavItem>
          </LinkContainer>
        )}
        <LinkContainer to="/about">
          <NavItem eventKey={9}>
            <Glyphicon glyph="question-sign" /> O aplikaci
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
    <main>
      <Switch>
        <Route exact path="/" component={withAuth(withFetchUcastnici(CasomericContainer))} />
        <Route path="/signin" component={withoutAuth(SignInContainer)} />
        <Route path="/casomeric" component={withAuth(withFetchUcastnici(CasomericContainer))} />
        <Route
          path="/ucastnici"
          component={withAuth(withFetchUcastnici(UcastniciDigestContainer))}
        />
        <Route path="/prihlasky" component={withAuth(withFetchUcastnici(Prihlasky))} />
        <Route path="/prihlaseni" component={withAuth(withFetchUcastnici(PrihlaseniContainer))} />
        <Route path="/startujici" component={withAuth(withFetchUcastnici(StartujiciContainer))} />
        <Route path="/ubytovani" component={withAuth(withFetchUcastnici(UbytovaniContainer))} />
        <Route path="/signout" component={withAuth(SignOutContainer)} />
        <Route path="/about" component={() => <About username={username} />} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  username: PropTypes.string
};

export default App;
