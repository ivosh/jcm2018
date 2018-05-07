import { combineReducers } from 'redux';
import casomiryReducer from './Casomira/Casomiry/casomiryReducer';

const casomericReducer = combineReducers({
  casomiry: casomiryReducer
});

export default casomericReducer;
