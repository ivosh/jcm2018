export const initialState = {
  signingIn: false,
  errorCode: '',
  errorMessage: '',
  showError: false
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_REQUEST':
      return { ...state, signingIn: true, errorCode: '', errorMessage: '', showError: false };
    case 'SIGN_IN_SUCCESS':
      return { ...state, signingIn: false };
    case 'SIGN_IN_ERROR':
      return {
        ...state,
        signingIn: false,
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
