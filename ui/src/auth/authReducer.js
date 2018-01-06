import { combineReducers } from 'redux';
import signInReducer from './SignIn/signInReducer';

const combinedReducer = combineReducers({
  signIn: signInReducer
});

const authReducer = (state, action) => {
  const intermediateState = combinedReducer(state, action);

  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return { ...intermediateState, isAuthenticated: true, token: action.token };
    case 'SIGN_IN_ERROR':
    case 'SIGN_OUT_SUCCESS':
      return { ...intermediateState, isAuthenticated: false, token: null };
    default:
      return intermediateState;
  }
};

export default authReducer;
