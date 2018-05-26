import { combineReducers } from 'redux';
import prihlaseniReducer from './Prihlaseni/prihlaseniReducer';
import prihlaskyReducer from './PrihlaskyDohlasky/prihlaskyReducer';
import startovniCislaReducer from './StartovniCisla/startovniCislaReducer';
import ubytovaniReducer from './Ubytovani/ubytovaniReducer';
import ucastniciDigestReducer from './UcastniciDigest/ucastniciDigestReducer';

const registratorReducer = combineReducers({
  prihlaseni: prihlaseniReducer,
  prihlasky: prihlaskyReducer,
  startovniCisla: startovniCislaReducer,
  ubytovani: ubytovaniReducer,
  ucastniciDigest: ucastniciDigestReducer
});

export default registratorReducer;
