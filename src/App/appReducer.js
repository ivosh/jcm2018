import { combineReducers } from 'redux';
import mezicasyReducer from '../Mezicasy/mezicasyReducer';
import stopkyReducer from '../Stopky/stopkyReducer';

const appReducer = combineReducers({
  stopky: stopkyReducer,
  mezicasy: mezicasyReducer
});

export default appReducer;
