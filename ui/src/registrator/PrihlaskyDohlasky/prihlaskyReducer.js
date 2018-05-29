import { combineReducers } from 'redux';
import { createPrihlaskyFormReducer } from './PrihlaskyForm/prihlaskyFormReducer';
import { createPlatbyReducer } from './Platby/platbyReducer';
import { createStartCisloReducer } from './StartCislo/startCisloReducer';

const prihlaskyReducer = combineReducers({
  form: createPrihlaskyFormReducer('PRIHLASKY'),
  platby: createPlatbyReducer('PRIHLASKY'),
  startCislo: createStartCisloReducer('PRIHLASKY')
});

export default prihlaskyReducer;
