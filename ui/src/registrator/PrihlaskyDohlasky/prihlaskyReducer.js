import { combineReducers } from 'redux';
import prihlaskyFormReducer from './PrihlaskyForm/prihlaskyFormReducer';
import platbyReducer from './Platby/platbyReducer';
import { createStartCisloReducer } from './StartCislo/startCisloReducer';

const prihlaskyReducer = combineReducers({
  form: prihlaskyFormReducer,
  platby: platbyReducer,
  startCislo: createStartCisloReducer('PRIHLASKY')
});

export default prihlaskyReducer;
