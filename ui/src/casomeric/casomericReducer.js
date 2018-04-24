import { combineReducers } from 'redux';
import mezicasyReducer from './Casomira/Mezicasy/mezicasyReducer';
import startujiciReducer from './Casomira/Startujici/startujiciReducer';
import { createStopkyProTypReducer } from './Stopky/StopkyProTyp/stopkyProTypReducer';

const casomericProTypReducer = typ =>
  combineReducers({
    mezicasy: mezicasyReducer,
    startujici: startujiciReducer,
    stopky: createStopkyProTypReducer(typ)
  });

const casomericReducer = combineReducers({
  maraton: casomericProTypReducer('maraton'),
  půlmaraton: casomericProTypReducer('půlmaraton'),
  cyklo: casomericProTypReducer('cyklo'),
  koloběžka: casomericProTypReducer('koloběžka')
});

export default casomericReducer;
