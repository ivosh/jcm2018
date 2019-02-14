import { combineReducers } from 'redux';
import { DOHLASKY, PRIHLASKY } from '../constants';
import poharyReducer from './Pohary/poharyReducer';
import poradiReducer from './Poradi/poradiReducer';
import { createPrihlaseniDohlaseniReducer } from './PrihlaseniDohlaseni/prihlaseniDohlaseniReducer';
import { createPrihlaskyDohlaskyReducer } from './PrihlaskyDohlasky/prihlaskyDohlaskyReducer';
import startovniCislaReducer from './StartovniCisla/startovniCislaReducer';
import ubytovaniReducer from './Ubytovani/ubytovaniReducer';
import ucastniciDigestReducer from './UcastniciDigest/ucastniciDigestReducer';

const registratorReducer = combineReducers({
  dohlaseni: createPrihlaseniDohlaseniReducer('DOHLASENI'),
  dohlasky: createPrihlaskyDohlaskyReducer(DOHLASKY),
  pohary: poharyReducer,
  poradi: poradiReducer,
  prihlaseni: createPrihlaseniDohlaseniReducer('PRIHLASENI'),
  prihlasky: createPrihlaskyDohlaskyReducer(PRIHLASKY),
  startovniCisla: startovniCislaReducer,
  ubytovani: ubytovaniReducer,
  ucastniciDigest: ucastniciDigestReducer
});

export default registratorReducer;
