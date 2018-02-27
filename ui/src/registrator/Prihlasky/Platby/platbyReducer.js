import moment from 'moment';
import { PLATBA_TYPY } from '../../../common';
import { datumValid, numberValid, parseDatum } from '../../../Util';

const initialState = {
  castka: undefined,
  datum: undefined,
  typ: PLATBA_TYPY[0],
  poznamka: undefined,
  novaPlatbaMinified: true,
  validate: false
};

const platbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOVA_PLATBA_INPUT_CHANGED': {
      const [, name] = action.name.split('.');
      let { value } = action;
      if (action.name === 'novaPlatba.datum') {
        value = parseDatum(action.value);
      }
      return { ...state, [name]: value };
    }
    case 'NOVA_PLATBA_RESET':
    case 'PRIHLASKY_UCASTNIK_LOAD':
      return initialState;
    case 'NOVA_PLATBA_VALIDATE':
      return { ...state, validate: true };
    case 'NOVA_PLATBA_EXPAND':
      return { ...state, novaPlatbaMinified: false };
    case 'PRIHLASKY_ADD_PLATBA':
      return { ...state, novaPlatbaMinified: true };
    default:
      return state;
  }
};

export default platbyReducer;

export const inputValid = (name, value, novaPlatba) => {
  switch (name) {
    case 'novaPlatba.poznamka':
      return undefined;
    case 'novaPlatba.castka':
      return numberValid(value, novaPlatba.validate);
    case 'novaPlatba.datum':
      if (value === undefined) {
        if (novaPlatba.validate) {
          return 'error';
        }
        return undefined;
      }
      return datumValid(value) ? 'success' : 'error';
    case 'novaPlatba.typ':
      if (value === undefined && !novaPlatba.validate) {
        return undefined;
      }
      return PLATBA_TYPY.includes(value) ? undefined : 'error';
    default:
      return 'error';
  }
};

const isInputValid = (name, value, novaPlatba) => {
  const validationState = inputValid(name, value, novaPlatba);
  if (
    validationState === undefined ||
    validationState === 'success' ||
    validationState === 'warning'
  ) {
    return true;
  }
  return false;
};

export const novaPlatbaValid = novaPlatba =>
  isInputValid('novaPlatba.castka', novaPlatba.castka, novaPlatba) &&
  isInputValid('novaPlatba.datum', novaPlatba.datum, novaPlatba) &&
  isInputValid('novaPlatba.typ', novaPlatba.typ, novaPlatba) &&
  isInputValid('novaPlatba.poznamka', novaPlatba.poznamka, novaPlatba);

export const inputOptions = name => {
  switch (name) {
    case 'novaPlatba.typ':
      return PLATBA_TYPY.map(typ => ({ key: typ, value: typ }));
    default:
      return null;
  }
};

export const isInputEnabled = () => true;

export const formatValue = (name, rawValue) => {
  switch (name) {
    case 'novaPlatba.datum':
      return datumValid(rawValue) ? moment.utc(rawValue).format('D. M. YYYY') : rawValue || '';
    default:
      return rawValue ? `${rawValue}` : '';
  }
};
