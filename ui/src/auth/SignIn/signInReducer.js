export const initialState = {
  isSigningIn: false,
  errorCode: '',
  errorMessage: '',
  showError: false
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_REQUEST':
      return { ...state, isSigningIn: true, errorCode: '', errorMessage: '', showError: false };
    case 'SIGN_IN_SUCCESS':
      return { ...state, isSigningIn: false };
    case 'SIGN_IN_ERROR':
      return {
        ...state,
        isSigningIn: false,
        errorCode: action.code,
        errorMessage: action.status,
        showError: true
      };
    case 'SIGN_IN_HIDE_ERROR':
      return { ...state, showError: false };
    default:
      return state;
  }
};

export default signInReducer;
