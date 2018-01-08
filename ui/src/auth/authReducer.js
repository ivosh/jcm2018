import { combineReducers } from 'redux';
import signInReducer from './SignIn/signInReducer';

const authenticatedReducer = (state = false, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return true;
    case 'SIGN_IN_ERROR':
    case 'SIGN_OUT_SUCCESS':
      return false;
    default:
      return state;
  }
};

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return action.token;
    case 'SIGN_IN_ERROR':
    case 'SIGN_OUT_SUCCESS':
      return null;
    default:
      return state;
  }
};

const authReducer = combineReducers({
  authenticated: authenticatedReducer,
  signIn: signInReducer,
  token: tokenReducer
});

export default authReducer;
