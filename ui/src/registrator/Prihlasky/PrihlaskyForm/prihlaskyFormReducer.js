import moment from 'moment';
import {
  findKategorie,
  ubytovaniOdhlasit,
  ubytovaniPrihlasit,
  CODE_OK,
  CODE_MLADISTVY_UCASTNIK
} from '../../../common';
import { AKTUALNI_ROK, TYPY_KATEGORII } from '../../../constants';
import {
  datumValid,
  narozeniToStr,
  numberValid,
  parseDatum,
  validDatumFormats
} from '../../../Util';
import { getTypKategorie } from '../../../entities/rocniky/rocnikyReducer';

const initialState = {
  errorCode: '',
  errorMessage: '',
  showError: false,
  saved: false,
  saving: false,
  ucastnikId: undefined,
  validate: false,
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
    mladistvyPotvrzen: undefined,
    startovnePoSleve: undefined
  },
  platby: [],
  ubytovani: {}
};

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
  const maybeParsed = moment(`${den}.${mesic}.${rok}`, validDatumFormats[0], true);
  if (maybeParsed.isValid()) {
    return { den: maybeParsed.date(), mesic: maybeParsed.month() + 1, rok: maybeParsed.year() };
  }
  return { den: undefined, mesic: undefined, rok: value };
};

const reduceUbytovani = ({ den, value, ubytovani }) => {
  if (value) {
    return ubytovaniPrihlasit({ den, ubytovani });
  }
  return ubytovaniOdhlasit({ den, ubytovani });
};

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
          if (state.prihlaska.kategorie) {
            // eslint-disable-next-line no-param-reassign
            state = { ...state, prihlaska: { ...state.prihlaska, kategorie: undefined } };
          }
          if (state.prihlaska.mladistvyPotvrzen) {
            // eslint-disable-next-line no-param-reassign
            state = { ...state, prihlaska: { ...state.prihlaska, mladistvyPotvrzen: undefined } };
          }
          break;
        case 'prihlaska.datum':
          value = parseDatum(action.value);
          break;
        case 'prihlaska.typ':
          // eslint-disable-next-line no-param-reassign
          state = { ...state, prihlaska: { ...state.prihlaska, kategorie: action.id } };
          break;
        case 'prihlaska.startCislo':
        case 'prihlaska.startovnePoSleve':
          if (action.value === '') {
            value = undefined;
          } else {
            value = parseInt(action.value, 10);
            if (Number.isNaN(value)) {
              ({ value } = action);
            }
          }
          break;
        default:
          break;
      }
      if (section === 'ubytovani') {
        return {
          ...state,
          ubytovani: reduceUbytovani({ den: name, value, ubytovani: state.ubytovani })
        };
      }
      return { ...state, [section]: { ...state[section], [name]: value } };
    }
    case 'PRIHLASKY_UCASTNIK_LOAD':
      return {
        ...initialState,
        ucastnikId: action.id,
        udaje: action.udaje,
        prihlaska: action.prihlaska || initialState.prihlaska,
        platby: action.platby || initialState.platby,
        ubytovani: action.ubytovani || initialState.ubytovani
      };
    case 'PRIHLASKY_RESET':
      return initialState;
    case 'PRIHLASKY_VALIDATE_FORM':
      return { ...state, validate: true };
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
      const platby = [...state.platby, action.platba];
      platby.sort((a, b) => moment.utc(a.datum) - moment.utc(b.datum));
      return { ...state, platby };
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

const isMladistvy = ({ form, rocniky }) => {
  const rok = AKTUALNI_ROK;
  const found = findKategorie(rocniky.byRoky, {
    rok,
    typ: form.prihlaska.typ,
    pohlavi: form.udaje.pohlavi,
    narozeni: form.udaje.narozeni,
    mladistvyPotvrzen: false
  });
  return found.code === CODE_MLADISTVY_UCASTNIK;
};

const nonEmptyInputValid = ({ value, validate }) => {
  if (value === undefined) {
    if (validate) {
      return 'error';
    }
    return undefined;
  } else if (!value) {
    return 'error';
  }
  return 'success';
};

const narozeniValid = ({ value, validate, requireDenMesic }) => {
  const { den, mesic, rok } = value;
  if (den === undefined && mesic === undefined && rok === undefined) {
    if (validate) {
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

export const inputValid = ({ name, value, form, rocniky }) => {
  const { validate } = form;
  switch (name) {
    case 'udaje.prijmeni':
    case 'udaje.jmeno':
    case 'udaje.pohlavi':
    case 'udaje.obec':
    case 'udaje.stat':
    case 'prihlaska.kategorie':
    case 'prihlaska.typ':
      return nonEmptyInputValid({ value, validate });
    case 'udaje.adresa':
    case 'udaje.klub':
    case 'udaje.email':
    case 'udaje.telefon':
    case 'prihlaska.kod':
    case 'ubytovani.pátek':
    case 'ubytovani.sobota':
      return undefined;
    case 'udaje.narozeni':
      // TODO: kategorie presne => den + mesic required === true
      return narozeniValid({ value, validate, requireDenMesic: false });
    case 'udaje.psc':
      if (form.udaje.stat === 'Česká republika') {
        return nonEmptyInputValid({ value, validate });
      }
      return undefined;
    case 'prihlaska.datum':
      if (value === undefined) {
        if (validate) {
          return 'error';
        }
        return undefined;
      }
      return datumValid(value) ? 'success' : 'error';
    case 'prihlaska.startCislo': // Může nechat nevyplněné, doplní později.
    case 'prihlaska.startovnePoSleve':
      return numberValid(value, false);
    case 'prihlaska.mladistvyPotvrzen':
      if (isMladistvy({ form, rocniky })) {
        return nonEmptyInputValid({ value, validate });
      }
      return undefined;
    default:
      return 'error';
  }
};

const isInputValid = ({ name, value, form, rocniky }) => {
  const validationState = inputValid({ name, value, form, rocniky });
  if (
    validationState === undefined ||
    validationState === 'success' ||
    validationState === 'warning'
  ) {
    return true;
  }
  return false;
};

export const formValid = ({ form, rocniky }) => {
  const { udaje, prihlaska } = form;

  return (
    isInputValid({ name: 'udaje.prijmeni', value: udaje.prijmeni, form, rocniky }) &&
    isInputValid({ name: 'udaje.jmeno', value: udaje.jmeno, form, rocniky }) &&
    isInputValid({ name: 'udaje.narozeni', value: udaje.narozeni, form, rocniky }) &&
    isInputValid({ name: 'udaje.pohlavi', value: udaje.pohlavi, form, rocniky }) &&
    isInputValid({ name: 'udaje.obec', value: udaje.obec, form, rocniky }) &&
    isInputValid({ name: 'udaje.psc', value: udaje.psc, form, rocniky }) &&
    isInputValid({ name: 'udaje.stat', value: udaje.stat, form, rocniky }) &&
    isInputValid({ name: 'prihlaska.datum', value: prihlaska.datum, form, rocniky }) &&
    isInputValid({
      name: 'prihlaska.kategorie',
      value: prihlaska.kategorie,
      form,
      rocniky
    }) &&
    isInputValid({ name: 'prihlaska.typ', value: prihlaska.typ, form, rocniky }) &&
    isInputValid({
      name: 'prihlaska.mladistvyPotvrzen',
      value: prihlaska.mladistvyPotvrzen,
      form,
      rocniky
    })
  );
};

export const isInputVisible = ({ name, form, rocniky }) => {
  const [section, subsection] = name.split('.');
  if (section === 'ubytovani') {
    return !!rocniky.byRoky[AKTUALNI_ROK].ubytovani[subsection];
  }
  if (name === 'prihlaska.mladistvyPotvrzen') {
    return isMladistvy({ form, rocniky });
  }
  return true;
};

export const isInputEnabled = ({ name, form, rocniky }) => {
  const [section, subsection] = name.split('.');
  if (section === 'ubytovani') {
    return !(form.ubytovani[subsection] && form.ubytovani[subsection].prespano);
  }

  switch (name) {
    case 'prihlaska.startCislo': {
      const { typ } = form.prihlaska;
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

export const inputOptions = ({ name, form, rocniky }) => {
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
          pohlavi: form.udaje.pohlavi,
          narozeni: form.udaje.narozeni,
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
    default:
      return null;
  }
};

export const getValue = ({ name, form }) => {
  const [section, subsection] = name.split('.');
  if (section === 'ubytovani') {
    if (form[section][subsection]) {
      return form[section][subsection].prihlaseno;
    }
    return false;
  }
  return form[section][subsection];
};

export const formatValue = ({ name, rawValue }) => {
  switch (name) {
    case 'udaje.narozeni':
      return narozeniToStr(rawValue);
    case 'prihlaska.datum':
      return datumValid(rawValue) ? moment.utc(rawValue).format('D. M. YYYY') : rawValue || '';
    case 'prihlaska.startovnePoSleve':
      return rawValue >= 0 ? `${rawValue}` : '';
    case 'prihlaska.mladistvyPotvrzen':
    case 'ubytovani.pátek':
    case 'ubytovani.sobota':
      return rawValue ? 'on' : 'off';
    default:
      return rawValue ? `${rawValue}` : '';
  }
};
