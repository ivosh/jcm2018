import { combineReducers } from 'redux';
import prihlaseniReducer from './Prihlaseni/prihlaseniReducer';
import prihlaskyReducer from './Prihlasky/prihlaskyReducer';
import startujiciReducer from './Startujici/startujiciReducer';
import ubytovaniReducer from './Ubytovani/ubytovaniReducer';
import ucastniciDigestReducer from './UcastniciDigest/ucastniciDigestReducer';

const registratorReducer = combineReducers({
  prihlaseni: prihlaseniReducer,
  prihlasky: prihlaskyReducer,
  startujici: startujiciReducer,
  ubytovani: ubytovaniReducer,
  ucastniciDigest: ucastniciDigestReducer
});

export default registratorReducer;
