import { combineReducers } from 'redux';
import prihlaseniReducer from './Prihlaseni/prihlaseniReducer';
import { createPrihlaskyDohlaskyReducer } from './PrihlaskyDohlasky/prihlaskyDohlaskyReducer';
import startovniCislaReducer from './StartovniCisla/startovniCislaReducer';
import ubytovaniReducer from './Ubytovani/ubytovaniReducer';
import ucastniciDigestReducer from './UcastniciDigest/ucastniciDigestReducer';

const registratorReducer = combineReducers({
  dohlasky: createPrihlaskyDohlaskyReducer('DOHLASKY'),
  prihlaseni: prihlaseniReducer,
  prihlasky: createPrihlaskyDohlaskyReducer('PRIHLASKY'),
  startovniCisla: startovniCislaReducer,
  ubytovani: ubytovaniReducer,
  ucastniciDigest: ucastniciDigestReducer
});

export default registratorReducer;
