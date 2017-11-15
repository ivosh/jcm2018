import { combineReducers } from 'redux';
import ucastniciReducer from './Ucastnici/ucastniciReducer';

const registratorReducer = combineReducers({
  ucastnici: ucastniciReducer
});

export default registratorReducer;
