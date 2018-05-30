import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Panel, Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PrihlaskySearchContainer from './PrihlaskySearch/PrihlaskySearchContainer';
import './PrihlaskyDohlaskyMain.css';

const PrihlaskyDohlaskyMain = ({ path, routeOnSelect }) => (
  <Well>
    <Panel header="Přihlášky" bsStyle="info">
      <div className="PrihlaskyDohlaskyMain__div">
        <p>Vyber si jednu z akcí:</p>
        <div className="PrihlaskyDohlaskyMain__item">
          <div className="PrihlaskyDohlaskyMain__icon">
            <Glyphicon glyph="search" />
          </div>
          <PrihlaskySearchContainer routeOnSelect={routeOnSelect} />
        </div>
        <div className="PrihlaskyDohlaskyMain__item">
          <div className="PrihlaskyDohlaskyMain__icon">
            <Glyphicon glyph="remove" />
          </div>
          <LinkContainer to={`${path}reset`}>
            <Button bsStyle="danger">Nový účastník</Button>
          </LinkContainer>
        </div>
        <div className="PrihlaskyDohlaskyMain__item">
          <div className="PrihlaskyDohlaskyMain__icon">
            <Glyphicon glyph="edit" />
          </div>
          <LinkContainer to={`${path}edit`}>
            <Button bsStyle="primary">Pokračovat v editaci</Button>
          </LinkContainer>
        </div>
      </div>
    </Panel>
  </Well>
);

PrihlaskyDohlaskyMain.propTypes = {
  path: PropTypes.string.isRequired,
  routeOnSelect: PropTypes.func.isRequired
};

export default PrihlaskyDohlaskyMain;
