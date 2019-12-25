import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AuthorizedRoute from '../auth/AuthorizedRoute';
import UnauthorizedRoute from '../auth/UnauthorizedRoute';
import withFetchStopky from '../entities/withFetchStopky/withFetchStopky';
import withFetchUcastnici from '../entities/withFetchUcastnici/withFetchUcastnici';
import About from './About';
import CasomiryContainer from '../casomeric/Casomira/Casomiry/CasomiryContainer';
import Dohlaseni from '../registrator/PrihlaseniDohlaseni/Dohlaseni';
import Dohlasky from '../registrator/PrihlaskyDohlasky/Dohlasky';
import ErrorInModalContainer from '../shared/ErrorInModal/ErrorInModalContainer';
import Main from './Main';
import PoharyPoStartu from '../registrator/Pohary/PoharyPoStartu';
import PoharyPredStartem from '../registrator/Pohary/PoharyPredStartem';
import PokladnaContainer from '../registrator/Pokladna/PokladnaContainer';
import PoradiContainer from '../registrator/Poradi/PoradiContainer';
import Prihlaseni from '../registrator/PrihlaseniDohlaseni/Prihlaseni';
import Prihlasky from '../registrator/PrihlaskyDohlasky/Prihlasky';
import SignInContainer from '../auth/SignIn/SignInContainer';
import SignOutContainer from '../auth/SignOut/SignOutContainer';
import StartovniCislaContainer from '../registrator/StartovniCisla/StartovniCislaContainer';
import StartujiciContainer from '../registrator/Startujici/StartujiciContainer';
import Stopky from '../casomeric/Stopky/Stopky';
import UbytovaniContainer from '../registrator/Ubytovani/UbytovaniContainer';
import UcastniciDigestContainer from '../registrator/UcastniciDigest/UcastniciDigestContainer';
import VitezoveContainer from '../registrator/Vitezove/VitezoveContainer';
import VysledkyContainer from '../registrator/Vysledky/VysledkyContainer';
import { navsForMenu, navForRoute, navMenus } from './nav';
import './App.css';
import logo from './logo.svg';

const Item = ({ glyph, name }) => (
  <>
    <Glyphicon glyph={glyph} /> {name}
  </>
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
        <Navbar inverse={true}>
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
          <Nav className="App__Nav" pullRight={true}>
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
            <Route exact={true} path="/" component={Main} />
            <Route path="/about" component={() => <About username={username} />} />
            <AuthorizedRoute
              path="/casomira"
              component={withFetchUcastnici(withFetchStopky(CasomiryContainer))}
            />
            <AuthorizedRoute path="/dohlaseni" component={withFetchUcastnici(Dohlaseni)} />
            <AuthorizedRoute path="/dohlasky" component={withFetchUcastnici(Dohlasky)} />
            <AuthorizedRoute
              path="/pohary-po-startu"
              component={withFetchUcastnici(PoharyPoStartu)}
            />
            <AuthorizedRoute
              path="/pohary-pred-startem"
              component={withFetchUcastnici(PoharyPredStartem)}
            />
            <AuthorizedRoute path="/pokladna" component={withFetchUcastnici(PokladnaContainer)} />
            <AuthorizedRoute path="/poradi" component={withFetchUcastnici(PoradiContainer)} />
            <AuthorizedRoute path="/prihlaseni" component={withFetchUcastnici(Prihlaseni)} />
            <AuthorizedRoute path="/prihlasky" component={withFetchUcastnici(Prihlasky)} />
            <UnauthorizedRoute path="/signin" component={SignInContainer} />
            <AuthorizedRoute path="/signout" component={SignOutContainer} />
            <AuthorizedRoute
              path="/startujici"
              component={withFetchUcastnici(StartujiciContainer)}
            />
            <AuthorizedRoute
              path="/startovni-cisla"
              component={withFetchUcastnici(StartovniCislaContainer)}
            />
            <AuthorizedRoute path="/stopky" component={withFetchStopky(Stopky)} />
            <AuthorizedRoute path="/ubytovani" component={withFetchUcastnici(UbytovaniContainer)} />
            <AuthorizedRoute
              path="/ucastnici"
              component={withFetchUcastnici(UcastniciDigestContainer)}
            />
            <AuthorizedRoute path="/vitezove" component={withFetchUcastnici(VitezoveContainer)} />
            <AuthorizedRoute path="/vysledky" component={withFetchUcastnici(VysledkyContainer)} />
            <Redirect to="/" />
          </Switch>
          <ErrorInModalContainer title="Chybka se vloudila..." />
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
  location: { pathname: '/' },
  username: null
};

export default App;
