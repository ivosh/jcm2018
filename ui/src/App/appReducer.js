import { combineReducers } from 'redux';
import startujiciReducer from '../casomeric/Startujici/startujiciReducer';
import casomericReducer from '../casomeric/Casomeric/casomericReducer';
import registratorReducer from '../registrator/registratorReducer';
import rocnikyReducer from '../rocniky/rocnikyReducer';
import ucastniciReducer from '../ucastnici/ucastniciReducer';

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

const appReducer = combineReducers({
  casomeric: casomericReducer,
  startujici: startujiciReducer,
  registrator: registratorReducer,
  rocniky: rocnikyReducer,
  ucastnici: ucastniciReducer,
  connected
});

export default appReducer;
