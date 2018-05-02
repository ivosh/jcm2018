import { combineReducers } from 'redux';
import mezicasyReducer from './Casomira/Mezicasy/mezicasyReducer';
import startujiciReducer from './Casomira/Startujici/startujiciReducer';

const casomericProTypReducer = typ =>
  combineReducers({
    mezicasy: mezicasyReducer,
    startujici: startujiciReducer
  });

const casomericReducer = combineReducers({
  maraton: casomericProTypReducer('maraton'),
  půlmaraton: casomericProTypReducer('půlmaraton'),
  cyklo: casomericProTypReducer('cyklo'),
  koloběžka: casomericProTypReducer('koloběžka')
});

export default casomericReducer;
