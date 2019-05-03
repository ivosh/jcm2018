import { combineReducers } from 'redux';
import connectedReducer from 'ui-common/App/connectedReducer';
import createFetchingReducer from 'ui-common/App/fetchingReducer';
import authReducer from '../auth/authReducer';
import casomericReducer from '../casomeric/casomericReducer';
import entitiesReducer from '../entities/entitiesReducer';
import errorInModalReducer from '../shared/ErrorInModal/errorInModalReducer';
import registratorReducer from '../registrator/registratorReducer';
import timesyncReducer from '../Timesync/timesyncReducer';

const appReducer = combineReducers({
  auth: authReducer,
  error: errorInModalReducer,
  casomeric: casomericReducer,
  registrator: registratorReducer,
  entities: entitiesReducer,
  timesync: timesyncReducer,
  connected: connectedReducer,
  fetchingStopky: createFetchingReducer('STOPKY'),
  fetchingUcastnici: createFetchingReducer('UCASTNICI')
});

export default appReducer;
