import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import withAuth from '../auth/withAuth';
import withoutAuth from '../auth/withoutAuth';
import withFetchStopky from '../entities/withFetchStopky/withFetchStopky';
import withFetchUcastnici from '../entities/withFetchUcastnici/withFetchUcastnici';
import About from './About';
import CasomiryContainer from '../casomeric/Casomira/Casomiry/CasomiryContainer';
import Dohlasky from '../registrator/PrihlaskyDohlasky/Dohlasky';
import Main from './Main';
import PrihlaseniContainer from '../registrator/Prihlaseni/PrihlaseniContainer';
import Prihlasky from '../registrator/PrihlaskyDohlasky/Prihlasky';
import SignInContainer from '../auth/SignIn/SignInContainer';
import SignOutContainer from '../auth/SignOut/SignOutContainer';
import StartovniCislaContainer from '../registrator/StartovniCisla/StartovniCislaContainer';
import StartujiciContainer from '../registrator/Startujici/StartujiciContainer';
import Stopky from '../casomeric/Stopky/Stopky';
import UbytovaniContainer from '../registrator/Ubytovani/UbytovaniContainer';
import UcastniciDigestContainer from '../registrator/UcastniciDigest/UcastniciDigestContainer';
import { navsForMenu, navForRoute, navMenus } from './nav';
import './App.css';
import logo from './logo.svg';

const Item = ({ glyph, name }) => (
  <React.Fragment>
    <Glyphicon glyph={glyph} /> {name}
  </React.Fragment>
);
Item.propTypes = {
  glyph: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const CurrentItem = ({ route }) => (
  <li className="App__current-item">
    <Item {...navForRoute({ route })} />
  </li>
);
CurrentItem.propTypes = {
  route: PropTypes.string.isRequired
};

const NavsForMenu = ({ menu, menuGlyph, menuKey }) => (
  <NavDropdown
    eventKey={menuKey}
    id={`app-dropdown-${menu}`}
    title={
      <span>
        <Item glyph={menuGlyph} name={menu} />
      </span>
    }
  >
    {navsForMenu({ menu }).map(({ key, glyph, name, path }) => (
      <LinkContainer key={key} to={path}>
        <MenuItem eventKey={key}>
          <Item glyph={glyph} name={name} />
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

const NavsAuthenticated = () =>
  navMenus.map(({ key, glyph, name }) => (
    <NavsForMenu key={name} menu={name} menuGlyph={glyph} menuKey={key} />
  ));

class App extends PureComponent {
  render = () => {
    const { authenticated, connected, location, username } = this.props;

    return (
      <div className="App__div">
        <Navbar inverse>
          <Navbar.Header>
            <Link to="/">
              <img
                src={logo}
                className={connected ? 'App__logo--animated' : 'App__logo'}
                alt="logo"
              />
            </Link>
          </Navbar.Header>
          {authenticated && (
            <Nav className="App__Nav">
              <NavsAuthenticated />
              <CurrentItem route={location.pathname} />
            </Nav>
          )}
          <Nav className="App__Nav" pullRight>
            {!authenticated && (
              <LinkContainer to="/signin">
                <NavItem eventKey={5}>
                  <Glyphicon glyph="log-in" /> Přihlášení
                </NavItem>
              </LinkContainer>
            )}
            {authenticated && (
              <LinkContainer key="signout" to="/signout">
                <NavItem eventKey={6}>
                  <Glyphicon glyph="log-out" /> Odhlášení
                </NavItem>
              </LinkContainer>
            )}
            <LinkContainer to="/about">
              <NavItem eventKey={7}>
                <Glyphicon glyph="question-sign" /> O aplikaci
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>

        <main>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/about" component={() => <About username={username} />} />
            <Route
              path="/casomira"
              component={withAuth(withFetchUcastnici(withFetchStopky(CasomiryContainer)))}
            />
            <Route path="/dohlasky" component={withAuth(withFetchUcastnici(Dohlasky))} />
            <Route
              path="/prihlaseni"
              component={withAuth(withFetchUcastnici(PrihlaseniContainer))}
            />
            <Route path="/prihlasky" component={withAuth(withFetchUcastnici(Prihlasky))} />
            <Route path="/signin" component={withoutAuth(SignInContainer)} />
            <Route path="/signout" component={withAuth(SignOutContainer)} />
            <Route
              path="/startujici"
              component={withAuth(withFetchUcastnici(StartujiciContainer))}
            />
            <Route
              path="/startovni-cisla"
              component={withAuth(withFetchUcastnici(StartovniCislaContainer))}
            />
            <Route path="/stopky" component={withAuth(withFetchStopky(Stopky))} />
            <Route path="/ubytovani" component={withAuth(withFetchUcastnici(UbytovaniContainer))} />
            <Route
              path="/ucastnici"
              component={withAuth(withFetchUcastnici(UcastniciDigestContainer))}
            />
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    );
  };
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  username: PropTypes.string
};
App.defaultProps = {
  location: { pathname: '/' }
};

export default App;
