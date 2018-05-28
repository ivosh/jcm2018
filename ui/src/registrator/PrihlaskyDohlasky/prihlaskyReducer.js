import { combineReducers } from 'redux';
import prihlaskyFormReducer from './PrihlaskyForm/prihlaskyFormReducer';
import { createPlatbyReducer } from './Platby/platbyReducer';
import { createStartCisloReducer } from './StartCislo/startCisloReducer';

const prihlaskyReducer = combineReducers({
  form: prihlaskyFormReducer,
  platby: createPlatbyReducer('PRIHLASKY'),
  startCislo: createStartCisloReducer('PRIHLASKY')
});

export default prihlaskyReducer;
