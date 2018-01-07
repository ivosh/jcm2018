import React from 'react';
import { Glyphicon, Panel, Well } from 'react-bootstrap';
import { version } from '../../package.json';
import logo from './logo.svg';
import './About.css';

const About = () => (
  <Well>
    <Panel header="Jirkovský crossmarathon 2018" bsStyle="info">
      <div className="About_row">
        <img src={logo} className="App-logo-animated" alt="logo" />
        <div>
          Aplikace <Glyphicon glyph="star" />Jirkovský crossmarathon 2018<Glyphicon glyph="star" />
          <br />
          Verze: {version}
          <br />
          Origin: {(window && window.location && window.location.origin) || ''}
        </div>
      </div>
    </Panel>
  </Well>
);

export default About;
