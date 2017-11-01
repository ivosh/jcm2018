import { combineReducers } from 'redux';
import startujiciReducer from '../casomeric/Startujici/startujiciReducer';
import casomericReducer from '../casomeric/Casomeric/casomericReducer';

const appReducer = combineReducers({
  casomeric: casomericReducer,
  startujici: startujiciReducer
});

export default appReducer;
