import { combineReducers } from 'redux';
import mezicasyReducer from '../Mezicasy/mezicasyReducer';
import startujiciReducer from '../Startujici/startujiciReducer';
import stopkyReducer from '../Stopky/stopkyReducer';

const casomiraProTypReducer = combineReducers({
  mezicasy: mezicasyReducer,
  stopky: stopkyReducer,
  startujici: startujiciReducer
});

export default casomiraProTypReducer;
