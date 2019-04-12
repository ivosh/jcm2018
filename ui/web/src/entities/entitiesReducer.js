import { combineReducers } from 'redux';
import kategorieReducer from './kategorie/kategorieReducer';
import rocnikyReducer from './rocniky/rocnikyReducer';
import stopkyReducer from './stopky/stopkyReducer';
import ucastniciReducer from './ucastnici/ucastniciReducer';

const entitiesReducer = combineReducers({
  kategorie: kategorieReducer,
  rocniky: rocnikyReducer,
  stopky: stopkyReducer,
  ucastnici: ucastniciReducer
});

export default entitiesReducer;
