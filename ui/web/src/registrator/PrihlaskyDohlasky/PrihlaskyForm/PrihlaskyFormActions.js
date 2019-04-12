import { API_SAVE_UCAST, CODE_OK } from '../../../common';
import { AKTUALNI_ROK, PRIHLASKY_SAVE_MODAL_TIMEOUT, ActionPrefixes } from '../../../constants';
import { getDatumKonani } from '../../../entities/rocniky/rocnikyReducer';
import { WS_API } from '../../../store/wsAPI';
import { createInputChanged as genericCreateInputChanged } from '../Input/InputActions';
import { formErrors, kategorieInputOptions } from './prihlaskyFormReducer';

export const createInputChanged = ({ actionPrefix, rocniky }) => (name, event) => {
  const action = genericCreateInputChanged(actionPrefix)(name, event);
  return {
    ...action,
    chooseKategorie: ({ narozeni, pohlavi, typ }) =>
      kategorieInputOptions({ narozeni, pohlavi, rocniky })[typ]
  };
};

export const createReset = ({
  actionPrefix,
  jePrihlaskou = actionPrefix === ActionPrefixes.PRIHLASKY,
  now = new Date()
}) => ({ rocniky }) => {
  now.setUTCHours(0, 0, 0, 0);
  const datumKonani = jePrihlaskou ? now.toJSON() : getDatumKonani({ rocniky });

  return { type: `${actionPrefix}_RESET`, datumKonani };
};

export const createLoadUcastnik = ({
  actionPrefix,
  jePrihlaskou = actionPrefix === ActionPrefixes.PRIHLASKY
}) => ({ id, kategorie, rocniky, ucastnici }) => {
  const ucastnik = ucastnici.byIds[id];
  const posledniRok = ucastnik.roky[0];
  const ucast = ucastnik[posledniRok];
  const action = {
    type: `${actionPrefix}_UCASTNIK_LOAD`,
    datumKonani: jePrihlaskou ? undefined : getDatumKonani({ rocniky }),
    id,
    udaje: ucast.udaje
  };

  const letosniUcast = ucastnik[AKTUALNI_ROK];
  if (letosniUcast) {
    // Předvyplň ostatní jen pro aktuální rok. Minulé roky už jsou pasé.
    const { typ } = kategorie[letosniUcast.prihlaska.kategorie];
    action.prihlaska = { ...letosniUcast.prihlaska, typ };
    action.platby = letosniUcast.platby;
    action.ubytovani = letosniUcast.ubytovani;
    action.poznamky = letosniUcast.poznamky;
  }
  return action;
};

export const createValidate = actionPrefix => () => ({ type: `${actionPrefix}_VALIDATE_FORM` });

export const createValidationError = actionPrefix => errors => ({
  type: `${actionPrefix}_FORM_INVALID`,
  code: 'nejde uložit',
  errors,
  status: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.',
  title: 'vyplňování formuláře'
});

export const createHideModal = actionPrefix => () => ({ type: `${actionPrefix}_SAVE_HIDE_MODAL` });
export const createShowModal = actionPrefix => () => ({ type: `${actionPrefix}_SAVE_SHOW_MODAL` });
const showModalWithTimeout = (actionPrefix, dispatch) => {
  dispatch(createShowModal(actionPrefix)());
  setTimeout(() => dispatch(createHideModal(actionPrefix)()), PRIHLASKY_SAVE_MODAL_TIMEOUT);
};

const createRequest = ({ reduxName, state }) => {
  const rok = AKTUALNI_ROK;
  const {
    entities: { ucastnici },
    registrator: {
      [reduxName]: { form }
    }
  } = state;
  const existingUcast = form.ucastnikId ? ucastnici.byIds[form.ucastnikId][rok] || {} : {};
  const { udaje, prihlaska, platby, ubytovani, poznamky } = form;

  return {
    id: form.ucastnikId,
    rok,
    ...existingUcast,
    udaje,
    prihlaska,
    platby,
    ubytovani,
    poznamky
  };
};

const normalize = ({
  request,
  response: {
    response: { id }
  }
}) => {
  const { typ, ...jenPrihlaska } = request.prihlaska;
  return { request: { ...request, prihlaska: jenPrihlaska }, response: { id } };
};

export const CREATE_PRIHLASKY_SAVE = actionPrefix => `${actionPrefix}_SAVE`;
export const DOHLASKY_SAVE = CREATE_PRIHLASKY_SAVE(ActionPrefixes.DOHLASKY);
export const PRIHLASKY_SAVE = CREATE_PRIHLASKY_SAVE(ActionPrefixes.PRIHLASKY);

export const createPrihlaskySave = (actionPrefix, reduxName) => () => ({
  [WS_API]: {
    type: CREATE_PRIHLASKY_SAVE(actionPrefix),
    endpoint: API_SAVE_UCAST,
    normalize,
    request: state => createRequest({ reduxName, state }),
    title: 'ukládání formuláře'
  }
});

export const createSaveUcast = (actionPrefix, reduxName) => {
  const validate = createValidate(actionPrefix);
  const validationError = createValidationError(actionPrefix);
  const prihlaskySave = createPrihlaskySave(actionPrefix, reduxName);

  return () => async (dispatch, getState) => {
    await dispatch(validate());

    const state = getState();
    const {
      entities: { rocniky },
      registrator: {
        [reduxName]: { form }
      }
    } = state;

    const errors = formErrors({ form, rocniky });
    if (errors.length > 0) {
      dispatch(validationError(errors));
      return;
    }

    const { code } = await dispatch(prihlaskySave());
    if (code === CODE_OK) {
      showModalWithTimeout(actionPrefix, dispatch);
    }
  };
};
