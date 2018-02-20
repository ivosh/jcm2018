import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Panel, Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import withFetchUcastnici from '../withFetchUcastnici/withFetchUcastnici';
import PrihlaskySearchContainer from './PrihlaskySearch/PrihlaskySearchContainer';
import './PrihlaskyMain.css';

const PrihlaskySearchWithFetchUcastnici = withFetchUcastnici(PrihlaskySearchContainer);

const PrihlaskyMain = ({ path, routeOnSelect }) => (
  <Well>
    <Panel header="Přihlášky" bsStyle="info">
      <div className="PrihlaskyMain-div">
        <p>Vyber si jednu z akcí:</p>
        <div className="PrihlaskyMain-item">
          <div className="PrihlaskyMain-icon">
            <Glyphicon glyph="search" />
          </div>
          <PrihlaskySearchWithFetchUcastnici routeOnSelect={routeOnSelect} />
        </div>
        <div className="PrihlaskyMain-item">
          <div className="PrihlaskyMain-icon">
            <Glyphicon glyph="remove" />
          </div>
          <LinkContainer to={`${path}reset`}>
            <Button bsStyle="danger">Nový účastník</Button>
          </LinkContainer>
        </div>
        <div className="PrihlaskyMain-item">
          <div className="PrihlaskyMain-icon">
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

PrihlaskyMain.propTypes = {
  path: PropTypes.string.isRequired,
  routeOnSelect: PropTypes.func.isRequired
};

export default PrihlaskyMain;
