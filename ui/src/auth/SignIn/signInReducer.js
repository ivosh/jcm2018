export const initialState = {
  signingIn: false
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_REQUEST':
      return { ...state, signingIn: true };
    case 'SIGN_IN_ERROR':
    case 'SIGN_IN_SUCCESS':
      return { ...state, signingIn: false };
    default:
      return state;
  }
};

export default signInReducer;
