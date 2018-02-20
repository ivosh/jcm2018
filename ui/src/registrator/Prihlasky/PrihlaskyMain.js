import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import withFetchUcastnici from '../withFetchUcastnici/withFetchUcastnici';
import PrihlaskySearchContainer from './PrihlaskySearch/PrihlaskySearchContainer';
import './PrihlaskyMain.css';

const PrihlaskySearchWithFetchUcastnici = withFetchUcastnici(PrihlaskySearchContainer);

const PrihlaskyMain = ({ path, routeOnSelect }) => (
  <Well>
    <Panel header="Přihlášky" bsStyle="info" className="PrihlaskyMain-panel">
      <div className="PrihlaskyMain-div">
        <PrihlaskySearchWithFetchUcastnici routeOnSelect={routeOnSelect} />
        <div>- nebo -</div>
        <div className="PrihlaskyMain-button">
          <LinkContainer to={`${path}novy`}>
            <Button bsStyle="primary">Nový účastník</Button>
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
