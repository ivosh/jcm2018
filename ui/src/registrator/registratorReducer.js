import { combineReducers } from 'redux';
import ucastniciDigestReducer from './UcastniciDigest/ucastniciDigestReducer';

const registratorReducer = combineReducers({
  ucastniciDigest: ucastniciDigestReducer
});

export default registratorReducer;
