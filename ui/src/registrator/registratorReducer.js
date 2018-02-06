import { combineReducers } from 'redux';
import prihlaskyReducer from './Prihlasky/prihlaskyReducer';
import ucastniciDigestReducer from './UcastniciDigest/ucastniciDigestReducer';

const registratorReducer = combineReducers({
  prihlasky: prihlaskyReducer,
  ucastniciDigest: ucastniciDigestReducer
});

export default registratorReducer;
