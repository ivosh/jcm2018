import { combineReducers } from 'redux';
import prihlaseniReducer from './Prihlaseni/prihlaseniReducer';
import prihlaskyReducer from './Prihlasky/prihlaskyReducer';
import ucastniciDigestReducer from './UcastniciDigest/ucastniciDigestReducer';

const registratorReducer = combineReducers({
  prihlaseni: prihlaseniReducer,
  prihlasky: prihlaskyReducer,
  ucastniciDigest: ucastniciDigestReducer
});

export default registratorReducer;
