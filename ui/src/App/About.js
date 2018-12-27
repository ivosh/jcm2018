import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Panel, Well } from 'react-bootstrap';
import { version } from '../../package.json';
import { AKTUALNI_ROK } from '../constants';
import TimesyncContainer from '../Timesync/TimesyncContainer';
import './About.css';

const About = ({ username }) => (
  <Well>
    <Panel header={`Jirkovský crossmarathon ${AKTUALNI_ROK}`} bsStyle="info">
      <div className="About_row">
        <img src={process.env.PUBLIC_URL + '/logo.png'} className="App-logo-animated" alt="logo" />
        <div className="About_app">
          Aplikace <Glyphicon glyph="star" />
          Jirkovský crossmarathon {AKTUALNI_ROK} <Glyphicon glyph="star" />
          <br />
          Verze: {version}
          <br />
          Origin: {window.location.origin}
          <br />
          {username === null ? <span>Nepřihlášen</span> : <span>Přihlášen jako: {username}</span>}
        </div>
      </div>
      <div className="About_timesync">
        <TimesyncContainer />
      </div>
    </Panel>
  </Well>
);

About.propTypes = {
  username: PropTypes.string
};

export default About;
