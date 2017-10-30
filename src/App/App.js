import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import CasomericConnected from '../casomeric/Casomeric/CasomericConnected';
import Registrace from '../registrator/Registrace/Registrace';
import './App.css';
import logo from './logo.svg';

const App = props => (
  <div>
    <header>
      <nav className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NavLink to="/" className="App-link" activeClassName="App-link-active">
          Časoměřič
        </NavLink>
        <NavLink to="/registrace" className="App-link" activeClassName="App-link-active">
          Registrace
        </NavLink>
      </nav>
    </header>
    <main>
      <Switch>
        <Route exact path="/" component={CasomericConnected} />
        <Route path="/casomeric" component={CasomericConnected} />
        <Route path="/registrace" component={Registrace} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
);

export default App;
