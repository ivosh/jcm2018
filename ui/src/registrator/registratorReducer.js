import { combineReducers } from 'redux';
import prihlaseniReducer from './Prihlaseni/prihlaseniReducer';
import ucastniciDigestReducer from './UcastniciDigest/ucastniciDigestReducer';

const registratorReducer = combineReducers({
  prihlaseni: prihlaseniReducer,
  ucastniciDigest: ucastniciDigestReducer
});

export default registratorReducer;
