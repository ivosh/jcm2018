const initialState = {
  code: '',
  message: '',
  show: false,
  title: ''
};

const errorInModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_ERROR':
    case 'SIGN_OUT_ERROR':
    case 'STARTUJICI_CREATE_VYKON_ERROR':
    case 'STARTUJICI_DELETE_VYKON_ERROR': {
      // wsAPI furnishes action.response; legacy actions prepare code+status
      const code = action.response ? action.response.code : action.code;
      const message = action.response ? action.response.status : action.status;
      return { ...state, code, message, show: true, title: action.title };
    }
    case 'HIDE_ERROR':
      return initialState;
    default:
      return state;
  }
};

export default errorInModalReducer;
