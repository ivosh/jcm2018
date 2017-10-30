import { combineReducers } from 'redux';
import startujiciReducer from '../Startujici/startujiciReducer';
import casomericReducer from './casomericReducer';

const appReducer = combineReducers({
  casomeric: casomericReducer,
  startujici: startujiciReducer
});

export default appReducer;
