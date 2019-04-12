import { combineReducers } from 'redux';
import { createPrihlaskyFormReducer } from './PrihlaskyForm/prihlaskyFormReducer';
import { createPlatbyReducer } from './Platby/platbyReducer';
import { createStartCisloReducer } from './StartCislo/startCisloReducer';

export const createPrihlaskyDohlaskyReducer = actionPrefix =>
  combineReducers({
    form: createPrihlaskyFormReducer(actionPrefix),
    platby: createPlatbyReducer(actionPrefix),
    startCislo: createStartCisloReducer(actionPrefix)
  });
