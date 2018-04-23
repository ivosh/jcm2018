import { combineReducers } from 'redux';
import casomiraProTypReducer from './Casomira/CasomiraProTyp/casomiraProTypReducer';

const casomericReducer = combineReducers({
  // :TODO: také ostatní kategorie
  maraton: casomiraProTypReducer
});

export default casomericReducer;
