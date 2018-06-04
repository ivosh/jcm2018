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
      if (action.datumKonani) {
        return { ...initialState, datum: action.datumKonani };
      }
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

const inputError = ({ name, value, form }) => {
  const validationState = inputValid({ name, value, form });
  if (
    validationState === undefined ||
    validationState === 'success' ||
    validationState === 'warning'
  ) {
    return undefined; // success actually
  }
  return { name, value };
};

export const formErrors = ({ form }) => {
  const errors = [];
  errors.push(inputError({ name: 'novaPlatba.castka', value: form.castka, form }));
  errors.push(inputError({ name: 'novaPlatba.datum', value: form.datum, form }));
  errors.push(inputError({ name: 'novaPlatba.typ', value: form.typ, form }));
  errors.push(inputError({ name: 'novaPlatba.poznamka', value: form.poznamka, form }));

  return errors.filter(error => error);
};

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
