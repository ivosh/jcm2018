import { combineReducers } from 'redux';
import authReducer from '../auth/authReducer';
import casomericReducer from '../casomeric/casomericReducer';
import errorInModalReducer from '../shared/errorInModalReducer';
import registratorReducer from '../registrator/registratorReducer';
import entitiesReducer from '../entities/entitiesReducer';

const connected = (state = false, action) => {
  switch (action.type) {
    case 'WEBSOCKET_CONNECTED':
      return true;
    case 'WEBSOCKET_DISCONNECTED':
      return false;
    default:
      return state;
  }
};

const fetchingReducer = name => (state = 'init', action) => {
  switch (action.type) {
    case `FETCH_${name}_REQUEST`:
      return 'fetching';
    case `FETCH_${name}_SUCCESS`:
    case `FETCH_${name}_ERROR`:
      return 'done';
    default:
      return state;
  }
};

const appReducer = combineReducers({
  auth: authReducer,
  error: errorInModalReducer,
  casomeric: casomericReducer,
  registrator: registratorReducer,
  entities: entitiesReducer,
  connected,
  fetchingStopky: fetchingReducer('STOPKY'),
  fetchingUcastnici: fetchingReducer('UCASTNICI')
});

export default appReducer;
