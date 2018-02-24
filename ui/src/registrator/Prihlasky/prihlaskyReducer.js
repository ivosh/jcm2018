import { combineReducers } from 'redux';
import prihlaskyFormReducer from './PrihlaskyForm/prihlaskyFormReducer';
import platbyReducer from './Platby/platbyReducer';

const prihlaskyReducer = combineReducers({
  form: prihlaskyFormReducer,
  platby: platbyReducer
});

export default prihlaskyReducer;
