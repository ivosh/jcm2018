import { combineReducers } from 'redux';
import rocnikyReducer from './rocniky/rocnikyReducer';
import ucastniciReducer from './ucastnici/ucastniciReducer';

const entitiesReducer = combineReducers({
  rocniky: rocnikyReducer,
  ucastnici: ucastniciReducer
});

export default entitiesReducer;
