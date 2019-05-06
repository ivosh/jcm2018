import { combineReducers } from 'redux';
import connectedReducer from '../ui-common/App/connectedReducer';
import createFetchingReducer from '../ui-common/App/fetchingReducer';
import authReducer from '../ui-common/auth/authReducer';

const appReducer = combineReducers({
  auth: authReducer,
  connected: connectedReducer,
  fetchingStopky: createFetchingReducer('STOPKY'),
  fetchingUcastnici: createFetchingReducer('UCASTNICI')
});

export default appReducer;
