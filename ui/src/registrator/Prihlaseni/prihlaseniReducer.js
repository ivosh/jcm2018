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

const prihlaseniReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRIHLASENI_HIDE_ERROR':
      return { ...state, showError: false };
    case 'PRIHLASENI_INPUT_CHANGED': {
      const [section, name] = action.name.split('.');
      return { ...state, [section]: { ...state[section], [name]: action.value } };
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

// todo: narozeni
export const inputValid = (name, value, prihlaseni) => {
  switch (name) {
    case 'udaje.prijmeni':
    case 'udaje.jmeno':
    case 'udaje.pohlavi':
    case 'udaje.obec':
    case 'udaje.stat':
    case 'prihlaska.datum':
    case 'prihlaska.kategorie':
      return nonEmptyInputValid(value, prihlaseni.validateEmpty);
    case 'udaje.adresa':
    case 'udaje.klub':
    case 'udaje.email':
    case 'udaje.telefon':
    case 'prihlaska.kod':
      return undefined;
    case 'udaje.psc':
      if (prihlaseni.udaje.stat === 'Česká republika') {
        return nonEmptyInputValid(value, prihlaseni.validateEmpty);
      }
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
