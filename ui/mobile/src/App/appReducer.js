import { combineReducers } from 'redux';
import connectedReducer from '../ui-common/App/connectedReducer';
import createFetchingReducer from '../ui-common/App/fetchingReducer';

const appReducer = combineReducers({
  connected: connectedReducer,
  fetchingStopky: createFetchingReducer('STOPKY'),
  fetchingUcastnici: createFetchingReducer('UCASTNICI')
});

export default appReducer;
