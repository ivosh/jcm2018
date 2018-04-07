import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import StartujiciPanel from './StartujiciPanel';
import './Startujici.css';

const Startujici = ({ prihlaseni, odstartovani }) => (
  <div className="Startujici__div">
    <StartujiciPanel
      bsStyle="primary"
      popisek={
        <React.Fragment>
          <Glyphicon glyph="list-alt" /> Přihlášeni
        </React.Fragment>
      }
      seznam={prihlaseni}
    />
    <StartujiciPanel
      bsStyle="success"
      popisek={
        <React.Fragment>
          <Glyphicon glyph="road" /> Odstartováni
        </React.Fragment>
      }
      seznam={odstartovani}
    />
  </div>
);

Startujici.propTypes = {
  prihlaseni: PropTypes.array.isRequired,
  odstartovani: PropTypes.array.isRequired
};

export default Startujici;
