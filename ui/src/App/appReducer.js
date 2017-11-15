import { combineReducers } from 'redux';
import startujiciReducer from '../casomeric/Startujici/startujiciReducer';
import casomericReducer from '../casomeric/Casomeric/casomericReducer';
import registratorReducer from '../registrator/registratorReducer';

const appReducer = combineReducers({
  casomeric: casomericReducer,
  startujici: startujiciReducer,
  registrator: registratorReducer
});

export default appReducer;
