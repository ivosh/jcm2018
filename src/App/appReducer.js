import { combineReducers } from 'redux';
import mezicasyReducer from '../Mezicasy/mezicasyReducer';
import stopkyReducer from '../Stopky/stopkyReducer';
import startujiciReducer from '../Startujici/startujiciReducer';

const appReducer = combineReducers({
  stopky: stopkyReducer,
  mezicasy: mezicasyReducer,
  startujici: startujiciReducer
});

export default appReducer;
