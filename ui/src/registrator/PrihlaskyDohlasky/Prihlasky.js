import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import withFetchUcastnici from '../../entities/withFetchUcastnici/withFetchUcastnici';
import PrihlaskyMain from './PrihlaskyMain';
import PrihlaskyFormContainer from './PrihlaskyForm/PrihlaskyFormContainer';

const routeOnSelect = ({ history, path }) => id => history.push(`${path}${id}`);

const PrihlaskyMainWithRoute = ({ history, match: { path } }) => (
  <PrihlaskyMain routeOnSelect={routeOnSelect({ history, path })} path={path} />
);

PrihlaskyMainWithRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  })
};

const PrihlaskyFormWithFetchUcastnici = withFetchUcastnici(PrihlaskyFormContainer);

const PrihlaskyFormWithFetchUcastniciWithId = ({ match }) => (
  <PrihlaskyFormWithFetchUcastnici actionPrefix="PRIHLASKY" loadId={match.params.id} reduxName="prihlasky" />
);

PrihlaskyFormWithFetchUcastniciWithId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  })
};

const PrihlaskyFormWithFetchUcastniciWithEdit = () => <PrihlaskyFormWithFetchUcastnici actionPrefix="PRIHLASKY" reduxName="prihlasky" />;

const PrihlaskyFormWithFetchUcastniciWithReset = () => (
  <PrihlaskyFormWithFetchUcastnici actionPrefix="PRIHLASKY" reduxName="prihlasky" reset={true} />
);

const Prihlasky = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/`} exact component={PrihlaskyMainWithRoute} />
    <Route path={`${match.path}/edit`} component={PrihlaskyFormWithFetchUcastniciWithEdit} />
    <Route path={`${match.path}/reset`} component={PrihlaskyFormWithFetchUcastniciWithReset} />
    <Route path={`${match.path}/:id`} component={PrihlaskyFormWithFetchUcastniciWithId} />
  </Switch>
);

Prihlasky.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  })
};

export default Prihlasky;
