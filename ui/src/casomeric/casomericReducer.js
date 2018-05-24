import { combineReducers } from 'redux';
import casomiryReducer from './Casomira/Casomiry/casomiryReducer';
import { createNovyMezicasReducer } from './Casomira/NovyMezicas/novyMezicasReducer';

const novyMezicasReducers = combineReducers({
  maraton: createNovyMezicasReducer('maraton'),
  půlmaraton: createNovyMezicasReducer('půlmaraton'),
  cyklo: createNovyMezicasReducer('cyklo'),
  koloběžka: createNovyMezicasReducer('koloběžka')
});

const casomericReducer = combineReducers({
  casomiry: casomiryReducer,
  novyMezicas: novyMezicasReducers
});

export default casomericReducer;
