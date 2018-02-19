import { combineReducers } from 'redux';
import prihlaskyFormReducer from './PrihlaskyForm/prihlaskyFormReducer';

const prihlaskyReducer = combineReducers({
  form: prihlaskyFormReducer
});

export default prihlaskyReducer;
