import { combineReducers } from 'redux';
import kategorieReducer from './kategorie/kategorieReducer';
import rocnikyReducer from './rocniky/rocnikyReducer';
import ucastniciReducer from './ucastnici/ucastniciReducer';

const entitiesReducer = combineReducers({
  kategorie: kategorieReducer,
  rocniky: rocnikyReducer,
  ucastnici: ucastniciReducer
});

export default entitiesReducer;
