import { CASOMIRA_SAVE_VYKON } from '../../casomeric/Casomira/StartovniCisla/StartovniCislaActions';
import { SAVE_STOPKY } from '../../casomeric/Stopky/StopkyProTyp/StopkyProTypActions';
import { SIGN_IN } from '../../auth/SignIn/SignInActions';
import { SIGN_OUT } from '../../auth/SignOut/SignOutActions';
import {
  STARTUJICI_CREATE_VYKON,
  STARTUJICI_DELETE_VYKON
} from '../../registrator/Startujici/StartujiciActions';

const initialState = {
  code: '',
  message: '',
  show: false,
  title: ''
};

const errorInModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${CASOMIRA_SAVE_VYKON}_ERROR`:
    case `${SAVE_STOPKY}_ERROR`:
    case `${SIGN_IN}_ERROR`:
    case `${SIGN_OUT}_ERROR`:
    case `${STARTUJICI_CREATE_VYKON}_ERROR`:
    case `${STARTUJICI_DELETE_VYKON}_ERROR`: {
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
