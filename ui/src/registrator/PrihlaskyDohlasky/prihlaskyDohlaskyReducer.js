import { combineReducers } from 'redux';
import { createPrihlaskyFormReducer } from './PrihlaskyForm/prihlaskyFormReducer';
import { createPlatbyReducer } from './Platby/platbyReducer';
import { createStartCisloReducer } from './StartCislo/startCisloReducer';

// eslint-disable-next-line import/prefer-default-export
export const createPrihlaskyDohlaskyReducer = actionPrefix =>
  combineReducers({
    form: createPrihlaskyFormReducer(actionPrefix),
    platby: createPlatbyReducer(actionPrefix),
    startCislo: createStartCisloReducer(actionPrefix)
  });
