import moment from 'moment';
import { findKategorie, CODE_OK, PLATBA_TYPY } from '../../../common';
import { AKTUALNI_ROK, TYPY_KATEGORII } from '../../../constants';
import { narozeniToStr } from '../../../Util';
import { getTypKategorie } from '../../../entities/rocniky/rocnikyReducer';

const initialState = {
  errorCode: '',
  errorMessage: '',
  showError: false,
  saved: false,
  saving: false,
  ucastnikId: undefined,
  validateForm: false,
  validatePlatba: false,
  udaje: {
    prijmeni: undefined,
    jmeno: undefined,
    narozeni: { den: undefined, mesic: undefined, rok: undefined },
    pohlavi: undefined,
    adresa: undefined,
    obec: undefined,
    psc: undefined,
    stat: 'Česká republika',
    klub: undefined,
    email: undefined,
    telefon: undefined
  },
  prihlaska: {
    datum: undefined,
    kategorie: undefined,
    typ: undefined,
    startCislo: undefined,
    kod: undefined,
    mladistvyPotvrzen: undefined
  },
  platby: [],
  novaPlatba: { castka: undefined, datum: undefined, typ: PLATBA_TYPY[0], poznamka: undefined }
};

const validFormats = ['D.M.YYYY', 'D. M. YYYY', moment.ISO_8601];

const parseNarozeni = value => {
  if (value === undefined) {
    return { den: undefined, mesic: undefined, rok: undefined };
  }

  const split = value.split('.');
  if (split.length !== 3) {
    if (moment(value, 'YYYY', true).isValid()) {
      return { den: undefined, mesic: undefined, rok: moment(value, 'YYYY').year() };
    }
    return { den: undefined, mesic: undefined, rok: value };
  }

  const den = split[0] && split[0].trim();
  const mesic = split[1] && split[1].trim();
  const rok = split[2] && split[2].trim();
  const maybeParsed = moment(`${den}.${mesic}.${rok}`, validFormats[0], true);
  if (maybeParsed.isValid()) {
    return { den: maybeParsed.date(), mesic: maybeParsed.month() + 1, rok: maybeParsed.year() };
  }
  return { den: undefined, mesic: undefined, rok: value };
};

const datumValid = value => validFormats.some(format => moment(value, format, true).isValid());

const parseDatum = value =>
  validFormats.reduce((accumulator, format) => {
    if (!accumulator && moment(value, format, true).isValid()) {
      return moment.utc(value, format, true).toJSON();
    }
    return accumulator;
  }, undefined) || value;

const prihlaskyFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRIHLASKY_HIDE_ERROR':
      return { ...state, showError: false };
    case 'PRIHLASKY_INPUT_CHANGED': {
      const [section, name] = action.name.split('.');
      let { value } = action;
      switch (action.name) {
        case 'udaje.prijmeni':
          if (value.endsWith('ová') && state.udaje.pohlavi === undefined) {
            // eslint-disable-next-line no-param-reassign
            state = { ...state, udaje: { ...state.udaje, pohlavi: 'žena' } };
          }
          break;
        case 'udaje.narozeni':
          value = parseNarozeni(action.value);
          break;
        case 'prihlaska.datum':
        case 'novaPlatba.datum':
          value = parseDatum(action.value);
          break;
        case 'prihlaska.typ':
          // eslint-disable-next-line no-param-reassign
          state = { ...state, prihlaska: { ...state.prihlaska, kategorie: action.id } };
          break;
        default:
          break;
      }
      return { ...state, [section]: { ...state[section], [name]: value } };
    }
    case 'PRIHLASKY_UCASTNIK_LOAD':
      return {
        ...initialState,
        ucastnikId: action.id,
        udaje: action.udaje,
        prihlaska: action.prihlaska ? action.prihlaska : initialState.prihlaska,
        platby: action.platby ? action.platby : initialState.platby
      };
    case 'PRIHLASKY_RESET':
      return initialState;
    case 'PRIHLASKY_VALIDATE_FORM':
      return { ...state, validateForm: true };
    case 'PRIHLASKY_VALIDATE_PLATBA':
      return { ...state, validatePlatba: true };
    case 'PRIHLASKY_FORM_INVALID':
      return {
        ...state,
        showError: true,
        errorCode: action.code,
        errorMessage: action.status
      };
    case 'PRIHLASKY_SAVE_REQUEST':
      return { ...state, saving: true };
    case 'PRIHLASKY_SAVE_SUCCESS':
      return { ...state, ucastnikId: action.id, saving: false, showError: false };
    case 'PRIHLASKY_SAVE_ERROR':
      return {
        ...state,
        saving: false,
        errorCode: action.code,
        errorMessage: action.status,
        showError: true
      };
    case 'PRIHLASKY_SAVE_SHOW_MODAL':
      return { ...state, saved: true };
    case 'PRIHLASKY_SAVE_HIDE_MODAL':
      return { ...state, saved: false };
    case 'PRIHLASKY_ADD_PLATBA': {
      const { castka, ...novaPlatba } = state.novaPlatba;
      const platby = [...state.platby, { castka: parseInt(castka, 10), ...novaPlatba }];
      platby.sort((a, b) => moment.utc(a.datum) - moment.utc(b.datum));
      return {
        ...state,
        validatePlatba: false,
        platby,
        novaPlatba: initialState.novaPlatba
      };
    }
    case 'PRIHLASKY_REMOVE_PLATBA':
      return {
        ...state,
        platby: [...state.platby.slice(0, action.idx), ...state.platby.slice(action.idx + 1)]
      };
    default:
      return state;
  }
};

export default prihlaskyFormReducer;

const nonEmptyInputValid = (value, validateForm) => {
  if (value === undefined) {
    if (validateForm) {
      return 'error';
    }
    return undefined;
  } else if (!value) {
    return 'error';
  }
  return 'success';
};

const narozeniValid = (value, validateForm, requireDenMesic) => {
  const { den, mesic, rok } = value;
  if (den === undefined && mesic === undefined && rok === undefined) {
    if (validateForm) {
      return 'error';
    }
    return undefined;
  }

  if (den === undefined && mesic === undefined) {
    if (requireDenMesic) {
      return 'error';
    }

    if (moment(rok, 'YYYY', true).isValid()) {
      return 'warning';
    }
    return 'error';
  }

  if (moment(`${den}.${mesic}.${rok}`, 'D.M.YYYY', true).isValid()) {
    return 'success';
  }
  return 'error';
};

const numberValid = (value, validatePlatba) => {
  if (value === undefined && !validatePlatba) {
    return undefined;
  }

  const cislo = parseInt(value, 10);
  return Number.isNaN(cislo) ? 'error' : 'success';
};

export const inputValid = (name, value, prihlaskyForm) => {
  switch (name) {
    case 'udaje.prijmeni':
    case 'udaje.jmeno':
    case 'udaje.pohlavi':
    case 'udaje.obec':
    case 'udaje.stat':
    case 'prihlaska.kategorie':
    case 'prihlaska.typ':
      return nonEmptyInputValid(value, prihlaskyForm.validateForm);
    case 'udaje.adresa':
    case 'udaje.klub':
    case 'udaje.email':
    case 'udaje.telefon':
    case 'prihlaska.startCislo': // Může nechat nevyplněné, doplní se později.
    case 'prihlaska.kod':
    case 'prihlaska.mladistvyPotvrzen':
    case 'novaPlatba.poznamka':
      return undefined;
    case 'udaje.narozeni':
      // TODO: kategorie presne => den + mesic required === true
      return narozeniValid(value, prihlaskyForm.validateForm, false);
    case 'udaje.psc':
      if (prihlaskyForm.udaje.stat === 'Česká republika') {
        return nonEmptyInputValid(value, prihlaskyForm.validateForm);
      }
      return undefined;
    case 'prihlaska.datum':
      if (value === undefined) {
        if (prihlaskyForm.validateForm) {
          return 'error';
        }
        return undefined;
      }
      return datumValid(value) ? 'success' : 'error';
    case 'novaPlatba.castka':
      return numberValid(value, prihlaskyForm.validatePlatba);
    case 'novaPlatba.datum':
      if (value === undefined) {
        if (prihlaskyForm.validatePlatba) {
          return 'error';
        }
        return undefined;
      }
      return datumValid(value) ? 'success' : 'error';
    case 'novaPlatba.typ':
      if (value === undefined && !prihlaskyForm.validatePlatba) {
        return undefined;
      }
      return PLATBA_TYPY.includes(value) ? 'success' : 'error';
    default:
      return 'error';
  }
};

const isInputValid = (name, value, prihlaskyForm) => {
  const validationState = inputValid(name, value, prihlaskyForm);
  if (
    validationState === undefined ||
    validationState === 'success' ||
    validationState === 'warning'
  ) {
    return true;
  }
  return false;
};

export const formValid = prihlaskyForm => {
  const { udaje, prihlaska } = prihlaskyForm;

  return (
    isInputValid('udaje.prijmeni', udaje.prijmeni, prihlaskyForm) &&
    isInputValid('udaje.jmeno', udaje.jmeno, prihlaskyForm) &&
    isInputValid('udaje.narozeni', udaje.narozeni, prihlaskyForm) &&
    isInputValid('udaje.pohlavi', udaje.pohlavi, prihlaskyForm) &&
    isInputValid('udaje.obec', udaje.obec, prihlaskyForm) &&
    isInputValid('udaje.psc', udaje.psc, prihlaskyForm) &&
    isInputValid('udaje.stat', udaje.stat, prihlaskyForm) &&
    isInputValid('prihlaska.datum', prihlaska.datum, prihlaskyForm) &&
    isInputValid('prihlaska.kategorie', prihlaska.kategorie, prihlaskyForm) &&
    isInputValid('prihlaska.typ', prihlaska.typ, prihlaskyForm)
  );
};

export const novaPlatbaValid = prihlaskyForm => {
  const { novaPlatba } = prihlaskyForm;

  return (
    isInputValid('novaPlatba.castka', novaPlatba.castka, prihlaskyForm) &&
    isInputValid('novaPlatba.datum', novaPlatba.datum, prihlaskyForm) &&
    isInputValid('novaPlatba.typ', novaPlatba.typ, prihlaskyForm) &&
    isInputValid('novaPlatba.poznamka', novaPlatba.poznamka, prihlaskyForm)
  );
};

export const isInputEnabled = (name, prihlaskyForm, rocniky) => {
  switch (name) {
    case 'prihlaska.startCislo': {
      const { typ } = prihlaskyForm.prihlaska;
      if (!typ) {
        return false;
      }
      const typKategorieRocniku = getTypKategorie({ rok: AKTUALNI_ROK, typ, rocniky });
      return !!typKategorieRocniku.startCisla;
    }
    default:
      return true;
  }
};

export const inputOptions = (name, prihlaskyForm, rocniky) => {
  switch (name) {
    case 'udaje.pohlavi':
      return [
        { key: 'muž', value: { pohlavi: 'muž' } },
        { key: 'žena', value: { pohlavi: 'žena' } }
      ];
    case 'prihlaska.typ': {
      const rok = AKTUALNI_ROK;
      const typyKategorii =
        (rocniky.byRoky[rok] && Object.keys(rocniky.byRoky[rok].kategorie)) || TYPY_KATEGORII;

      const list = [];
      typyKategorii.forEach(typ => {
        const found = findKategorie(rocniky.byRoky, {
          rok,
          typ,
          pohlavi: prihlaskyForm.udaje.pohlavi,
          narozeni: prihlaskyForm.udaje.narozeni,
          mladistvyPotvrzen: true
        });
        if (found.code === CODE_OK) {
          const { pohlavi, vek } = found.kategorie;
          list.push({ key: typ, id: found.kategorie.id, value: { pohlavi, typ, vek } });
        } else {
          list.push({ key: typ, value: { typ } });
        }
      });
      return list;
    }
    case 'novaPlatba.typ':
      return PLATBA_TYPY.map(typ => ({ key: typ, value: typ }));
    default:
      return null;
  }
};

export const formatValue = (name, rawValue) => {
  switch (name) {
    case 'udaje.narozeni':
      return narozeniToStr(rawValue);
    case 'prihlaska.datum':
    case 'novaPlatba.datum':
      return datumValid(rawValue) ? moment.utc(rawValue).format('D. M. YYYY') : rawValue || '';
    default:
      return rawValue ? `${rawValue}` : '';
  }
};