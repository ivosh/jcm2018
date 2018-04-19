import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
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
  ucastnici: {
    key: '1.1',
    glyph: 'list',
    menu: 'před startem',
    name: 'Účastníci',
    path: '/ucastnici'
  },
  prihlasky: {
    key: '1.2',
    glyph: 'edit',
    menu: 'před startem',
    name: 'Přihlášky',
    path: '/prihlasky'
  },
  prihlaseni: {
    key: '1.3',
    glyph: 'list-alt',
    menu: 'před startem',
    name: 'Přihlášeni',
    path: '/prihlaseni'
  },
  ubytovani: {
    key: '1.4',
    glyph: 'bed',
    menu: 'před startem',
    name: 'Ubytovaní',
    path: '/ubytovani'
  },
  startujici: {
    key: '2.1',
    glyph: 'road',
    menu: 'na startu',
    name: 'Startující',
    path: '/startujici'
  },
  'startovni-cisla': {
    key: '3.1',
    glyph: 'sound-5-1',
    menu: 'po startu',
    name: 'Startovní čísla',
    path: '/startovni-cisla'
  },
  casomeric: { key: '3.2', glyph: 'time', menu: 'po startu', name: 'Časoměřič', path: '/casomeric' }
};

const NavsForMenu = ({ menu, menuGlyph, menuKey }) => (
  <NavDropdown
    eventKey={menuKey}
    id={`app-dropdown-${menu}`}
    title={
      <span>
        <Glyphicon glyph={menuGlyph} /> {menu}
      </span>
    }
  >
    {Object.values(navs)
      .filter(nav => nav.menu === menu)
      .sort((a, b) => a.key.localeCompare(b.key))
      .map(({ key, glyph, name, path }) => (
        <LinkContainer key={key} to={path}>
          <MenuItem eventKey={key}>
            <Glyphicon glyph={glyph} /> {name}
          </MenuItem>
        </LinkContainer>
      ))}
  </NavDropdown>
);

NavsForMenu.propTypes = {
  menu: PropTypes.string.isRequired,
  menuGlyph: PropTypes.string.isRequired,
  menuKey: PropTypes.number.isRequired
};

const menus = [
  { key: 1, glyph: 'edit', menu: 'před startem' },
  { key: 2, glyph: 'road', menu: 'na startu' },
  { key: 3, glyph: 'time', menu: 'po startu' }
];
const NavsAuthenticated = () =>
  menus.map(({ key, glyph, menu }) => (
    <NavsForMenu key={menu} menu={menu} menuGlyph={glyph} menuKey={key} />
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
