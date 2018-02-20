import { combineReducers } from 'redux';
import authReducer from '../auth/authReducer';
import startujiciReducer from '../casomeric/Startujici/startujiciReducer';
import casomericReducer from '../casomeric/Casomeric/casomericReducer';
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

const fetching = (state = 'init', action) => {
  switch (action.type) {
    case 'FETCH_UCASTNICI_REQUEST':
      return 'fetching';
    case 'FETCH_UCASTNICI_SUCCESS':
    case 'FETCH_UCASTNICI_ERROR':
      return 'done';
    default:
      return state;
  }
};

const appReducer = combineReducers({
  auth: authReducer,
  casomeric: casomericReducer,
  startujici: startujiciReducer,
  registrator: registratorReducer,
  entities: entitiesReducer,
  connected,
  fetching
});

export default appReducer;
