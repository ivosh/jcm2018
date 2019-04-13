import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import withFetchUcastnici from '../../entities/withFetchUcastnici/withFetchUcastnici';
import PrihlaskyDohlaskyMain from './PrihlaskyDohlaskyMain';
import PrihlaskyFormContainer from './PrihlaskyForm/PrihlaskyFormContainer';

const routeOnSelect = ({ history, path }) => id => history.push(`${path}${id}`);

const MainWithRoute = ({ history, match: { path }, name }) => (
  <PrihlaskyDohlaskyMain name={name} path={path} routeOnSelect={routeOnSelect({ history, path })} />
);

MainWithRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }),
  name: PropTypes.string.isRequired
};

const FormWithFetchUcastnici = withFetchUcastnici(PrihlaskyFormContainer);

const FormWithFetchUcastniciWithId = ({ actionPrefix, match, reduxName }) => (
  <FormWithFetchUcastnici
    actionPrefix={actionPrefix}
    loadId={match.params.id}
    reduxName={reduxName}
  />
);

FormWithFetchUcastniciWithId.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  reduxName: PropTypes.string.isRequired
};

const FormWithFetchUcastniciWithEdit = ({ actionPrefix, reduxName }) => (
  <FormWithFetchUcastnici actionPrefix={actionPrefix} reduxName={reduxName} />
);

FormWithFetchUcastniciWithEdit.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

const FormWithFetchUcastniciWithReset = ({ actionPrefix, reduxName }) => (
  <FormWithFetchUcastnici actionPrefix={actionPrefix} reduxName={reduxName} reset={true} />
);

FormWithFetchUcastniciWithReset.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

const PrihlaskyDohlasky = ({ actionPrefix, match, name, reduxName }) => (
  <Switch>
    <Route
      path={`${match.path}/`}
      exact
      component={matchProps => <MainWithRoute name={name} {...matchProps} />}
    />
    <Route
      path={`${match.path}/edit`}
      component={() => (
        <FormWithFetchUcastniciWithEdit actionPrefix={actionPrefix} reduxName={reduxName} />
      )}
    />
    <Route
      path={`${match.path}/reset`}
      component={() => (
        <FormWithFetchUcastniciWithReset actionPrefix={actionPrefix} reduxName={reduxName} />
      )}
    />
    <Route
      path={`${match.path}/:id`}
      component={matchProps => (
        <FormWithFetchUcastniciWithId
          actionPrefix={actionPrefix}
          reduxName={reduxName}
          {...matchProps}
        />
      )}
    />
  </Switch>
);

PrihlaskyDohlasky.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }),
  name: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

export default PrihlaskyDohlasky;
