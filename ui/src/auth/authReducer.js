import { combineReducers } from 'redux';
import signInReducer from './SignIn/signInReducer';

const isAuthenticatedReducer = (state = false, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return { ...state, isAuthenticated: true };
    case 'SIGN_IN_ERROR':
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return { ...state, token: action.token };
    case 'SIGN_IN_ERROR':
    case 'SIGN_OUT_SUCCESS':
      return { ...state, token: null };
    default:
      return state;
  }
};

const authReducer = combineReducers({
  isAuthenticated: isAuthenticatedReducer,
  signIn: signInReducer,
  token: tokenReducer
});

export default authReducer;
