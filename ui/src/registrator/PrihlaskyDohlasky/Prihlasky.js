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

const PrihlaskyFormWithFetchUcastniciWithId = ({ actionPrefix, match, reduxName }) => (
  <PrihlaskyFormWithFetchUcastnici
    actionPrefix={actionPrefix}
    loadId={match.params.id}
    reduxName={reduxName}
  />
);

PrihlaskyFormWithFetchUcastniciWithId.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  reduxName: PropTypes.string.isRequired
};

const PrihlaskyFormWithFetchUcastniciWithEdit = ({ actionPrefix, reduxName }) => (
  <PrihlaskyFormWithFetchUcastnici actionPrefix={actionPrefix} reduxName={reduxName} />
);

PrihlaskyFormWithFetchUcastniciWithEdit.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

const PrihlaskyFormWithFetchUcastniciWithReset = ({ actionPrefix, reduxName }) => (
  <PrihlaskyFormWithFetchUcastnici actionPrefix={actionPrefix} reduxName={reduxName} reset={true} />
);

PrihlaskyFormWithFetchUcastniciWithReset.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

const Prihlasky = ({ match }) => {
  const actionPrefix = 'PRIHLASKY';
  const reduxName = 'prihlasky';

  return (
    <Switch>
      <Route path={`${match.path}/`} exact component={PrihlaskyMainWithRoute} />
      <Route
        path={`${match.path}/edit`}
        component={() => (
          <PrihlaskyFormWithFetchUcastniciWithEdit
            actionPrefix={actionPrefix}
            reduxName={reduxName}
          />
        )}
      />
      <Route
        path={`${match.path}/reset`}
        component={() => (
          <PrihlaskyFormWithFetchUcastniciWithReset
            actionPrefix={actionPrefix}
            reduxName={reduxName}
          />
        )}
      />
      <Route
        path={`${match.path}/:id`}
        component={matchProps => (
          <PrihlaskyFormWithFetchUcastniciWithId
            actionPrefix={actionPrefix}
            reduxName={reduxName}
            {...matchProps}
          />
        )}
      />
    </Switch>
  );
};

Prihlasky.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  })
};

export default Prihlasky;
