import { combineReducers } from 'redux';
import stopkyReducer from './Stopky/stopkyReducer';

const appReducer = combineReducers({
  stopky: stopkyReducer
});

export default appReducer;
