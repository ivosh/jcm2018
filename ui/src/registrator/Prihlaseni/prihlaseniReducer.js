import moment from 'moment';
import { findKategorie, CODE_OK } from '../../common';
import { AKTUALNI_ROK, TYPY_KATEGORII } from '../../constants';
import { narozeniToStr } from '../../Util';
import { prijmeniJmenoNarozeniSortMethod } from '../../entities/ucastnici/ucastniciReducer';

const initialState = {
  errorCode: '',
  errorMessage: '',
  showError: false,
  fetching: false,
  saved: false,
  saving: false,
  ucastnikId: undefined,
  validateEmpty: false,
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
  }
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

const prihlaseniReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRIHLASENI_HIDE_ERROR':
      return { ...state, showError: false };
    case 'PRIHLASENI_INPUT_CHANGED': {
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
    case 'PRIHLASENI_UCASTNIK_SELECTED':
      return {
        ...state,
        ucastnikId: action.id,
        udaje: action.udaje,
        prihlaska: action.prihlaska ? action.prihlaska : initialState.prihlaska
      };
    case 'PRIHLASENI_RESET':
      return initialState;
    case 'PRIHLASENI_VALIDATE_EMPTY':
      return { ...state, validateEmpty: true };
    case 'PRIHLASENI_FORM_INVALID':
      return {
        ...state,
        showError: true,
        errorCode: action.code,
        errorMessage: action.status
      };
    case 'PRIHLASENI_SAVE_REQUEST':
      return { ...state, saving: true };
    case 'PRIHLASENI_SAVE_SUCCESS':
      return { ...state, ucastnikId: action.id, saving: false, showError: false };
    case 'PRIHLASENI_SAVE_ERROR':
      return {
        ...state,
        saving: false,
        errorCode: action.code,
        errorMessage: action.status,
        showError: true
      };
    case 'PRIHLASENI_SAVE_MODAL_SHOW':
      return { ...state, saved: true };
    case 'PRIHLASENI_SAVE_MODAL_HIDE':
      return { ...state, saved: false };
    case 'FETCH_UCASTNICI_REQUEST':
      return { ...state, fetching: true };
    case 'FETCH_UCASTNICI_SUCCESS':
    case 'FETCH_UCASTNICI_ERROR':
      return { ...state, fetching: false };
    default:
      return state;
  }
};

export default prihlaseniReducer;

const nonEmptyInputValid = (value, validateEmpty) => {
  if (value === undefined) {
    if (validateEmpty) {
      return 'error';
    }
    return undefined;
  } else if (!value) {
    return 'error';
  }
  return 'success';
};

const narozeniValid = (value, validateEmpty, requireDenMesic) => {
  const { den, mesic, rok } = value;
  if (den === undefined && mesic === undefined && rok === undefined) {
    if (validateEmpty) {
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

export const inputValid = (name, value, prihlaseni) => {
  switch (name) {
    case 'udaje.prijmeni':
    case 'udaje.jmeno':
    case 'udaje.pohlavi':
    case 'udaje.obec':
    case 'udaje.stat':
    case 'prihlaska.kategorie':
    case 'prihlaska.typ':
      return nonEmptyInputValid(value, prihlaseni.validateEmpty);
    case 'udaje.adresa':
    case 'udaje.klub':
    case 'udaje.email':
    case 'udaje.telefon':
    case 'prihlaska.startCislo': // Může nechat nevyplněné, doplní se později.
    case 'prihlaska.kod':
    case 'prihlaska.mladistvyPotvrzen':
      return undefined;
    case 'udaje.narozeni':
      // TODO: kategorie presne => den + mesic required === true
      return narozeniValid(value, prihlaseni.validateEmpty, false);
    case 'udaje.psc':
      if (prihlaseni.udaje.stat === 'Česká republika') {
        return nonEmptyInputValid(value, prihlaseni.validateEmpty);
      }
      return undefined;
    case 'prihlaska.datum':
      if (value === undefined) {
        if (prihlaseni.validateEmpty) {
          return 'error';
        }
        return undefined;
      }
      return datumValid(value) ? 'success' : 'error';
    default:
      return 'error';
  }
};

const isInputValid = (name, value, prihlaseni) => {
  const validationState = inputValid(name, value, prihlaseni);
  if (
    validationState === undefined ||
    validationState === 'success' ||
    validationState === 'warning'
  ) {
    return true;
  }
  return false;
};

export const prihlaseniValid = prihlaseni => {
  const { udaje, prihlaska } = prihlaseni;

  return (
    isInputValid('udaje.prijmeni', udaje.prijmeni, prihlaseni) &&
    isInputValid('udaje.jmeno', udaje.jmeno, prihlaseni) &&
    isInputValid('udaje.narozeni', udaje.narozeni, prihlaseni) &&
    isInputValid('udaje.pohlavi', udaje.pohlavi, prihlaseni) &&
    isInputValid('udaje.obec', udaje.obec, prihlaseni) &&
    isInputValid('udaje.psc', udaje.psc, prihlaseni) &&
    isInputValid('udaje.stat', udaje.stat, prihlaseni) &&
    isInputValid('prihlaska.datum', prihlaska.datum, prihlaseni) &&
    isInputValid('prihlaska.kategorie', prihlaska.kategorie, prihlaseni) &&
    isInputValid('prihlaska.typ', prihlaska.typ, prihlaseni)
  );
};

export const isInputEnabled = (name, prihlaseni, rocniky) => {
  switch (name) {
    case 'prihlaska.startCislo': {
      const { typ } = prihlaseni.prihlaska;
      if (!typ) {
        return false;
      }
      const rok = AKTUALNI_ROK;
      const rocnik = rocniky.byRoky[rok];
      const typKategorieRocniku = rocnik.kategorie[typ];
      return !!typKategorieRocniku.startCisla;
    }
    default:
      return true;
  }
};

const formatKategorie = kategorie => {
  let value = kategorie.typ;
  if (kategorie.pohlavi) {
    value += ` - ${kategorie.pohlavi}`;
  }
  if (kategorie.vek) {
    value += ` - ${kategorie.vek.min}`;
    if (kategorie.vek.max === 150) {
      value += ' a více';
    } else {
      value += `-${kategorie.vek.max}`;
    }
  }
  return value;
};

export const inputOptions = (name, prihlaseni, rocniky, ucastnici) => {
  switch (name) {
    case 'udaje.prijmeni+prihlaska.kod': {
      const selected = ucastnici.allIds.map(id => {
        const ucastnik = ucastnici.byIds[id];
        const posledniRok = ucastnik.roky[0];
        const { prijmeni, jmeno, narozeni } = ucastnik[posledniRok].udaje;
        const result = { id, prijmeni, jmeno, narozeni };
        if (ucastnik[AKTUALNI_ROK]) {
          result.kod = ucastnik[AKTUALNI_ROK].prihlaska.kod;
        }
        return result;
      });
      return selected.sort(prijmeniJmenoNarozeniSortMethod);
    }
    case 'udaje.pohlavi':
      return [{ key: 'muž', value: 'muž' }, { key: 'žena', value: 'žena' }];
    case 'prihlaska.typ': {
      const rok = AKTUALNI_ROK;
      const typyKategorii =
        (rocniky.byRoky[rok] && Object.keys(rocniky.byRoky[rok].kategorie)) || TYPY_KATEGORII;

      const list = [];
      typyKategorii.forEach(typ => {
        const found = findKategorie(rocniky.byRoky, {
          rok,
          typ,
          pohlavi: prihlaseni.udaje.pohlavi,
          narozeni: prihlaseni.udaje.narozeni,
          mladistvyPotvrzen: true
        });
        if (found.code === CODE_OK) {
          list.push({ key: typ, id: found.kategorie.id, value: formatKategorie(found.kategorie) });
        } else {
          list.push({ key: typ, value: typ });
        }
      });
      return list;
    }
    default:
      return null;
  }
};

export const formatValue = (name, rawValue) => {
  switch (name) {
    case 'udaje.narozeni':
      return narozeniToStr(rawValue);
    case 'prihlaska.datum':
      return datumValid(rawValue) ? moment.utc(rawValue).format('D. M. YYYY') : rawValue || '';
    default:
      return rawValue ? `${rawValue}` : '';
  }
};
