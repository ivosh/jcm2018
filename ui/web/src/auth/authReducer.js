import { combineReducers } from 'redux';
import { SIGN_IN } from './SignIn/SignInActions';
import { SIGN_OUT } from './SignOut/SignOutActions';
import signInReducer from './SignIn/signInReducer';

const authenticatedReducer = (state = false, action) => {
  switch (action.type) {
    case `${SIGN_IN}_SUCCESS`:
      return true;
    case `${SIGN_IN}_ERROR`:
    case `${SIGN_OUT}_SUCCESS`:
    case `${SIGN_OUT}_ERROR`:
      return false;
    default:
      return state;
  }
};

const decodedTokenReducer = (state = null, action) => {
  switch (action.type) {
    case `${SIGN_IN}_SUCCESS`:
      return action.response.decodedToken;
    case `${SIGN_IN}_ERROR`:
    case `${SIGN_OUT}_SUCCESS`:
    case `${SIGN_OUT}_ERROR`:
      return null;
    default:
      return state;
  }
};

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case `${SIGN_IN}_SUCCESS`:
      return action.response.token;
    case `${SIGN_IN}_ERROR`:
    case `${SIGN_OUT}_SUCCESS`:
    case `${SIGN_OUT}_ERROR`:
      return null;
    default:
      return state;
  }
};

const authReducer = combineReducers({
  authenticated: authenticatedReducer,
  signIn: signInReducer,
  decodedToken: decodedTokenReducer,
  token: tokenReducer
});

export default authReducer;
