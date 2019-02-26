import { combineReducers } from 'redux';
import { ActionPrefixes, ReduxNames } from '../constants';
import poharyReducer from './Pohary/poharyReducer';
import poradiReducer from './Poradi/poradiReducer';
import { createPrihlaseniDohlaseniReducer } from './PrihlaseniDohlaseni/prihlaseniDohlaseniReducer';
import { createPrihlaskyDohlaskyReducer } from './PrihlaskyDohlasky/prihlaskyDohlaskyReducer';
import startovniCislaReducer from './StartovniCisla/startovniCislaReducer';
import ubytovaniReducer from './Ubytovani/ubytovaniReducer';
import ucastniciDigestReducer from './UcastniciDigest/ucastniciDigestReducer';

const registratorReducer = combineReducers({
  [ReduxNames.dohlaseni]: createPrihlaseniDohlaseniReducer(ActionPrefixes.DOHLASENI),
  [ReduxNames.dohlasky]: createPrihlaskyDohlaskyReducer(ActionPrefixes.DOHLASKY),
  [ReduxNames.pohary]: poharyReducer,
  [ReduxNames.poradi]: poradiReducer,
  [ReduxNames.prihlaseni]: createPrihlaseniDohlaseniReducer(ActionPrefixes.PRIHLASENI),
  [ReduxNames.prihlasky]: createPrihlaskyDohlaskyReducer(ActionPrefixes.PRIHLASKY),
  startovniCisla: startovniCislaReducer,
  ubytovani: ubytovaniReducer,
  ucastniciDigest: ucastniciDigestReducer
});

export default registratorReducer;
