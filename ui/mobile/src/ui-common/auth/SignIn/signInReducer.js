import { SIGN_IN } from './SignInActions';

export const initialState = {
  signingIn: false,
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SIGN_IN}_REQUEST`:
      return { ...state, signingIn: true };
    case `${SIGN_IN}_ERROR`:
    case `${SIGN_IN}_SUCCESS`:
      return { ...state, signingIn: false };
    default:
      return state;
  }
};

export default signInReducer;
