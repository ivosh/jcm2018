import { combineReducers } from 'redux';
import prihlaskyFormReducer from './PrihlaskyForm/prihlaskyFormReducer';
import platbyReducer from './Platby/platbyReducer';
import startCisloReducer from './StartCislo/startCisloReducer';

const prihlaskyReducer = combineReducers({
  form: prihlaskyFormReducer,
  platby: platbyReducer,
  startCislo: startCisloReducer
});

export default prihlaskyReducer;
