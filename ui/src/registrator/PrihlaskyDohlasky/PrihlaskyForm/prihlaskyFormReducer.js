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
  jePrihlaskou: undefined,
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

export const createPrihlaskyFormReducer = (
  actionPrefix,
  jePrihlaskou = actionPrefix === 'PRIHLASKY'
) => (state = { ...initialState, jePrihlaskou }, action) => {
  switch (action.type) {
    case `${actionPrefix}_HIDE_ERROR`:
      return { ...state, showError: false };
    case `${actionPrefix}_INPUT_CHANGED`: {
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
    case `${actionPrefix}_UCASTNIK_LOAD`:
      return {
        ...initialState,
        jePrihlaskou,
        ucastnikId: action.id,
        udaje: action.udaje,
        prihlaska: action.prihlaska || initialState.prihlaska,
        platby: action.platby || initialState.platby,
        ubytovani: action.ubytovani || initialState.ubytovani
      };
    case `${actionPrefix}_RESET`:
      return {
        ...initialState,
        jePrihlaskou,
        prihlaska: { ...initialState.prihlaska, datum: action.datumKonani }
      };
    case `${actionPrefix}_VALIDATE_FORM`:
      return { ...state, validate: true };
    case `${actionPrefix}_FORM_INVALID`:
      return {
        ...state,
        showError: true,
        errorCode: action.code,
        errorMessage: action.status
      };
    case `${actionPrefix}_SAVE_REQUEST`:
      return { ...state, saving: true };
    case `${actionPrefix}_SAVE_SUCCESS`:
      return { ...state, ucastnikId: action.id, saving: false, showError: false };
    case `${actionPrefix}_SAVE_ERROR`:
      return {
        ...state,
        saving: false,
        errorCode: action.code,
        errorMessage: action.status,
        showError: true
      };
    case `${actionPrefix}_SAVE_SHOW_MODAL`:
      return { ...state, saved: true };
    case `${actionPrefix}_SAVE_HIDE_MODAL`:
      return { ...state, saved: false };
    case `${actionPrefix}_ADD_PLATBA`: {
      const platby = [...state.platby, action.platba];
      platby.sort((a, b) => moment.utc(a.datum) - moment.utc(b.datum));
      return { ...state, platby };
    }
    case `${actionPrefix}_REMOVE_PLATBA`:
      return {
        ...state,
        platby: [...state.platby.slice(0, action.idx), ...state.platby.slice(action.idx + 1)]
      };
    case 'FETCH_ROCNIKY_SUCCESS':
      if (!jePrihlaskou && !state.prihlaska.datum) {
        return { ...state, prihlaska: { ...state.prihlaska, datum: action.getDatumKonani() } };
      }
      return state;
    default:
      return state;
  }
};

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

const isStartCisloRequired = ({ form, rocniky, rok = AKTUALNI_ROK }) => {
  const { typ } = form.prihlaska;
  if (!typ) {
    return false;
  }

  const typKategorieRocniku = getTypKategorie({ rok, typ, rocniky });
  return !!typKategorieRocniku.startCisla;
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
  const { jePrihlaskou, validate } = form;
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
    case 'prihlaska.startCislo':
      // Dohláška má startovní číslo povinné, přihláška doplňuje později.
      return numberValid(
        value,
        validate && (!jePrihlaskou && isStartCisloRequired({ form, rocniky }))
      );
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

const inputError = ({ name, value, form, rocniky }) => {
  const validationState = inputValid({ name, value, form, rocniky });
  if (
    validationState === undefined ||
    validationState === 'success' ||
    validationState === 'warning'
  ) {
    return undefined; // success actually
  }
  return { name, value };
};

export const formErrors = ({ form, rocniky }) => {
  const { udaje, prihlaska } = form;

  const errors = [];
  errors.push(inputError({ name: 'udaje.prijmeni', value: udaje.prijmeni, form, rocniky }));
  errors.push(inputError({ name: 'udaje.jmeno', value: udaje.jmeno, form, rocniky }));
  errors.push(inputError({ name: 'udaje.narozeni', value: udaje.narozeni, form, rocniky }));
  errors.push(inputError({ name: 'udaje.pohlavi', value: udaje.pohlavi, form, rocniky }));
  errors.push(inputError({ name: 'udaje.obec', value: udaje.obec, form, rocniky }));
  errors.push(inputError({ name: 'udaje.psc', value: udaje.psc, form, rocniky }));
  errors.push(inputError({ name: 'udaje.stat', value: udaje.stat, form, rocniky }));
  errors.push(
    inputError({
      name: 'prihlaska.datum',
      value: prihlaska.datum,
      form,
      rocniky
    })
  );
  errors.push(
    inputError({
      name: 'prihlaska.kategorie',
      value: prihlaska.kategorie,
      form,
      rocniky
    })
  );
  errors.push(inputError({ name: 'prihlaska.typ', value: prihlaska.typ, form, rocniky }));
  errors.push(
    inputError({
      name: 'prihlaska.startCislo',
      value: prihlaska.startCislo,
      form,
      rocniky
    })
  );
  errors.push(
    inputError({
      name: 'prihlaska.mladistvyPotvrzen',
      value: prihlaska.mladistvyPotvrzen,
      form,
      rocniky
    })
  );

  return errors.filter(error => error);
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
    case 'prihlaska.datum':
      return !!form.jePrihlaskou; // dohlášky mají datum disabled
    case 'prihlaska.startCislo':
      return isStartCisloRequired({ form, rocniky });
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
          const { id, pohlavi, vek } = found.kategorie;
          list.push({ key: typ, id, value: { pohlavi, typ, vek } });
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
