import { ActionPrefixes } from '../../constants';
import { SIGN_IN } from '../../auth/SignIn/SignInActions';
import { SIGN_OUT } from '../../auth/SignOut/SignOutActions';
import { CASOMIRA_SAVE_VYKON } from '../../casomeric/Casomira/StartovniCisla/StartovniCislaActions';
import { MODIFY_STOPKY } from '../../casomeric/Stopky/StopkyProTyp/StopkyProTypActions';
import { FETCH_ROCNIKY } from '../../entities/rocniky/rocnikyActions';
import { FETCH_STOPKY } from '../../entities/stopky/stopkyActions';
import { FETCH_UCASTNICI } from '../../entities/ucastnici/ucastniciActions';
import { POHAR_PREDAN } from '../../registrator/Pohary/PoharyActions';
import {
  POZNAMKA_ADD,
  POZNAMKA_DELETE,
  POZNAMKA_MODIFY
} from '../../registrator/Poznamky/PoznamkyActions';
import {
  DOHLASKY_SAVE,
  PRIHLASKY_SAVE
} from '../../registrator/PrihlaskyDohlasky/PrihlaskyForm/PrihlaskyFormActions';
import {
  STARTUJICI_CREATE_VYKON,
  STARTUJICI_DELETE_VYKON
} from '../../registrator/Startujici/StartujiciActions';
import { MODIFY_UBYTOVANI } from '../../registrator/Ubytovani/UbytovaniActions';

const initialState = {
  code: '',
  message: '',
  show: false,
  title: ''
};

const errorInModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${CASOMIRA_SAVE_VYKON}_ERROR`:
    case `${ActionPrefixes.DOHLASKY}_FORM_INVALID`:
    case `${DOHLASKY_SAVE}_ERROR`:
    case `${FETCH_ROCNIKY}_ERROR`:
    case `${FETCH_STOPKY}_ERROR`:
    case `${FETCH_UCASTNICI}_ERROR`:
    case `${MODIFY_STOPKY}_ERROR`:
    case `${MODIFY_UBYTOVANI}_ERROR`:
    case `${POHAR_PREDAN}_ERROR`:
    case `${POZNAMKA_ADD}_ERROR`:
    case `${POZNAMKA_DELETE}_ERROR`:
    case `${POZNAMKA_MODIFY}_ERROR`:
    case `${ActionPrefixes.PRIHLASKY}_FORM_INVALID`:
    case `${PRIHLASKY_SAVE}_ERROR`:
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
