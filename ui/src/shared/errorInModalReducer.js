const initialState = {
  code: '',
  message: '',
  show: false
};

const errorInModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_ERROR':
    case 'SIGN_OUT_ERROR':
      return { ...state, code: action.code, message: action.status, show: true };
    case 'HIDE_ERROR':
      return initialState;
    default:
      return state;
  }
};

export default errorInModalReducer;
