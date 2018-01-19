import moment from 'moment';

const initialState = {
  errorCode: '',
  errorMessage: '',
  showError: false,
  fetching: false,
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
    startCislo: undefined,
    kod: undefined
  }
};

const parseNarozeni = value => {
  if (value === undefined) {
    return { den: undefined, mesic: undefined, rok: undefined };
  }

  const split = value.split('.');
  if (split.length !== 3) {
    return { den: undefined, mesic: undefined, rok: value };
  }

  const den = split[0] && split[0].trim();
  const mesic = split[1] && split[1].trim();
  const rok = split[2] && split[2].trim();
  return { den, mesic, rok };
};

const validFormats = ['D.M.YYYY', 'D. M. YYYY', moment.ISO_8601];
export const datumValid = value =>
  validFormats.some(format => moment(value, format, true).isValid());

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
        case 'udaje.narozeni':
          value = parseNarozeni(action.value);
          break;
        case 'prihlaska.datum':
          value = parseDatum(action.value);
          break;
        default:
          break;
      }
      return { ...state, [section]: { ...state[section], [name]: value } };
    }
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
      return { ...state, saving: false, showError: false };
    case 'PRIHLASENI_SAVE_ERROR':
      return {
        ...state,
        saving: false,
        errorCode: action.code,
        errorMessage: action.status,
        showError: true
      };
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
      if (validateEmpty) {
        return 'success';
      }
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
      return nonEmptyInputValid(value, prihlaseni.validateEmpty);
    case 'udaje.adresa':
    case 'udaje.klub':
    case 'udaje.email':
    case 'udaje.telefon':
    case 'prihlaska.kod':
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
    case 'prihlaska.startCislo':
      // TODO: kategorie ma startCislo => nonEmptyInputValid
      return undefined;
    default:
      return 'error';
  }
};

const isInputValid = (name, value, prihlaseni) => {
  const validationState = inputValid(name, value, prihlaseni);
  if (validationState === undefined || validationState === 'success') {
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
    isInputValid('prihlaska.kategorie', prihlaska.kategorie, prihlaseni)
  );
  // :TODO: kategorie -> ma startovni cisla -> startCislo valid? nebo undefined (vyplni server)
};

export const radioInputValues = name => {
  switch (name) {
    case 'udaje.pohlavi':
      return ['muž', 'žena'];
    default:
      return null;
  }
};
