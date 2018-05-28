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

export const createPlatbyReducer = actionPrefix => (state = initialState, action) => {
  switch (action.type) {
    case `${actionPrefix}_NOVA_PLATBA_INPUT_CHANGED`: {
      const [, name] = action.name.split('.');
      let { value } = action;
      if (action.name === 'novaPlatba.datum') {
        value = parseDatum(action.value);
      }
      return { ...state, [name]: value };
    }
    case `${actionPrefix}_NOVA_PLATBA_RESET`:
    case `${actionPrefix}_UCASTNIK_LOAD`:
      return initialState;
    case `${actionPrefix}_NOVA_PLATBA_VALIDATE`:
      return { ...state, validate: true };
    case `${actionPrefix}_NOVA_PLATBA_EXPAND`:
      return { ...state, novaPlatbaMinified: false };
    case `${actionPrefix}_ADD_PLATBA`:
      return { ...state, novaPlatbaMinified: true };
    default:
      return state;
  }
};

export const inputValid = ({ name, value, form }) => {
  const { validate } = form;
  switch (name) {
    case 'novaPlatba.poznamka':
      return undefined;
    case 'novaPlatba.castka':
      return numberValid(value, validate);
    case 'novaPlatba.datum':
      if (value === undefined) {
        if (validate) {
          return 'error';
        }
        return undefined;
      }
      return datumValid(value) ? 'success' : 'error';
    case 'novaPlatba.typ':
      if (value === undefined && !validate) {
        return undefined;
      }
      return PLATBA_TYPY.includes(value) ? 'success' : 'error';
    default:
      return 'error';
  }
};

const isInputValid = ({ name, value, form }) => {
  const validationState = inputValid({ name, value, form });
  if (
    validationState === undefined ||
    validationState === 'success' ||
    validationState === 'warning'
  ) {
    return true;
  }
  return false;
};

export const formValid = ({ form }) =>
  isInputValid({ name: 'novaPlatba.castka', value: form.castka, form }) &&
  isInputValid({ name: 'novaPlatba.datum', value: form.datum, form }) &&
  isInputValid({ name: 'novaPlatba.typ', value: form.typ, form }) &&
  isInputValid({ name: 'novaPlatba.poznamka', value: form.poznamka, form });

export const inputOptions = ({ name }) => {
  switch (name) {
    case 'novaPlatba.typ':
      return PLATBA_TYPY.map(typ => ({ key: typ, value: typ }));
    default:
      return null;
  }
};

export const isInputEnabled = () => true;
export const isInputVisible = () => true;

export const formatValue = ({ name, rawValue }) => {
  switch (name) {
    case 'novaPlatba.datum':
      return datumValid(rawValue) ? moment.utc(rawValue).format('D. M. YYYY') : rawValue || '';
    default:
      return rawValue ? `${rawValue}` : '';
  }
};
