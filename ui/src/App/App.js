import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import withAuth from '../auth/withAuth';
import withoutAuth from '../auth/withoutAuth';
import SignInContainer from '../auth/SignIn/SignInContainer';
import Casomeric from '../casomeric/Casomeric';
import withFetchUcastnici from '../entities/withFetchUcastnici/withFetchUcastnici';
import UcastniciDigestContainer from '../registrator/UcastniciDigest/UcastniciDigestContainer';
import Prihlasky from '../registrator/Prihlasky/Prihlasky';
import PrihlaseniContainer from '../registrator/Prihlaseni/PrihlaseniContainer';
import StartovniCislaContainer from '../registrator/StartovniCisla/StartovniCislaContainer';
import StartujiciContainer from '../registrator/Startujici/StartujiciContainer';
import UbytovaniContainer from '../registrator/Ubytovani/UbytovaniContainer';
import SignOutContainer from '../auth/SignOut/SignOutContainer';
import About from './About';
import './App.css';
import logo from './logo.svg';

const navs = {
  casomeric: { key: 1, glyph: 'time', name: 'Časoměřič', path: '/casomeric' },
  ucastnici: { key: 2, glyph: 'list', name: 'Účastníci', path: '/ucastnici' },
  prihlasky: { key: 3, glyph: 'edit', name: 'Přihlášky', path: '/prihlasky' },
  prihlaseni: { key: 4, glyph: 'list-alt', name: 'Přihlášeni', path: '/prihlaseni' },
  startujici: { key: 5, glyph: 'road', name: 'Startující', path: '/startujici' },
  'startovni-cisla': {
    key: 6,
    glyph: 'sound-5-1',
    name: 'Startovní čísla',
    path: '/startovni-cisla'
  },
  ubytovani: { key: 7, glyph: 'bed', name: 'Ubytovaní', path: '/ubytovani' }
};

const NavsAuthenticated = () =>
  Object.values(navs)
    .sort((a, b) => a.key - b.key)
    .map(({ key, glyph, name, path }) => (
      <LinkContainer key={key} to={path}>
        <NavItem eventKey={key}>
          <Glyphicon glyph={glyph} /> {name}
        </NavItem>
      </LinkContainer>
    ));

const App = ({ authenticated, connected, username }) => (
  <div className="App-div">
    <Navbar inverse>
      <Navbar.Header>
        <img src={logo} className={connected ? 'App-logo-animated' : 'App-logo'} alt="logo" />
      </Navbar.Header>
      {authenticated && (
        <Nav className="App-Nav">
          <NavsAuthenticated />
        </Nav>
      )}
      <Nav className="App-Nav" pullRight>
        {!authenticated && (
          <LinkContainer to="/signin">
            <NavItem eventKey={8}>
              <Glyphicon glyph="log-in" /> Přihlášení
            </NavItem>
          </LinkContainer>
        )}
        {authenticated && (
          <LinkContainer key="signout" to="/signout">
            <NavItem eventKey={9}>
              <Glyphicon glyph="log-out" /> Odhlášení
            </NavItem>
          </LinkContainer>
        )}
        <LinkContainer to="/about">
          <NavItem eventKey={10}>
            <Glyphicon glyph="question-sign" /> O aplikaci
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>

    <main>
      <Switch>
        <Route exact path="/" component={withAuth(withFetchUcastnici(Casomeric))} />
        <Route path="/signin" component={withoutAuth(SignInContainer)} />
        <Route path="/casomeric" component={withAuth(withFetchUcastnici(Casomeric))} />
        <Route
          path="/ucastnici"
          component={withAuth(withFetchUcastnici(UcastniciDigestContainer))}
        />
        <Route path="/prihlasky" component={withAuth(withFetchUcastnici(Prihlasky))} />
        <Route path="/prihlaseni" component={withAuth(withFetchUcastnici(PrihlaseniContainer))} />
        <Route path="/startujici" component={withAuth(withFetchUcastnici(StartujiciContainer))} />
        <Route
          path="/startovni-cisla"
          component={withAuth(withFetchUcastnici(StartovniCislaContainer))}
        />
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
