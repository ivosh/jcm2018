import { CODE_OK, CODE_TOKEN_INVALID, saveUcast } from '../../../common';
import { AKTUALNI_ROK, PRIHLASKY_SAVE_MODAL_TIMEOUT } from '../../../constants';
import { errorToStr } from '../../../Util';
import { authTokenExpired } from '../../../auth/SignIn/SignInActions';
import { getDatumKonani } from '../../../entities/rocniky/rocnikyReducer';
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

export const createHideError = actionPrefix => () => ({ type: `${actionPrefix}_HIDE_ERROR` });

export const createReset = ({
  actionPrefix,
  jePrihlaskou = actionPrefix === 'PRIHLASKY',
  now = new Date()
}) => ({ rocniky }) => {
  now.setUTCHours(0, 0, 0, 0);
  const datumKonani = jePrihlaskou ? now.toJSON() : getDatumKonani({ rocniky });

  return { type: `${actionPrefix}_RESET`, datumKonani };
};

export const createLoadUcastnik = ({
  actionPrefix,
  jePrihlaskou = actionPrefix === 'PRIHLASKY'
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
  }
  return action;
};

export const createValidate = actionPrefix => () => ({ type: `${actionPrefix}_VALIDATE_FORM` });

export const createValidationError = actionPrefix => errors => ({
  type: `${actionPrefix}_FORM_INVALID`,
  code: 'nejde uložit',
  errors,
  status: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.'
});

export const createSaveUcastRequest = actionPrefix => () => ({
  type: `${actionPrefix}_SAVE_REQUEST`
});

export const createSaveUcastSuccess = actionPrefix => ({
  prihlaska,
  platby = [],
  ubytovani = {},
  ...props
}) => {
  const { typ, ...jenPrihlaska } = prihlaska;

  return {
    type: `${actionPrefix}_SAVE_SUCCESS`,
    prihlaska: jenPrihlaska,
    platby,
    ubytovani,
    ...props,
    receivedAt: Date.now()
  };
};

export const createSaveUcastError = actionPrefix => ({ code, status, err, ...rest }) => ({
  type: `${actionPrefix}_SAVE_ERROR`,
  code,
  status,
  err: errorToStr(err),
  ...rest,
  receivedAt: Date.now()
});

const handleErrors = ({ actionPrefix, dispatch, response }) => {
  if (response.code === CODE_TOKEN_INVALID) {
    dispatch(authTokenExpired({ response }));
  } else {
    dispatch(createSaveUcastError(actionPrefix)(response));
  }
};

export const createHideModal = actionPrefix => () => ({ type: `${actionPrefix}_SAVE_HIDE_MODAL` });
export const createShowModal = actionPrefix => () => ({ type: `${actionPrefix}_SAVE_SHOW_MODAL` });
const showModalWithTimeout = (actionPrefix, dispatch) => {
  dispatch(createShowModal(actionPrefix)());
  setTimeout(() => dispatch(createHideModal(actionPrefix)()), PRIHLASKY_SAVE_MODAL_TIMEOUT);
};

export const createSaveUcast = (actionPrefix, reduxName) => () => async (
  dispatch,
  getState,
  wsClient
) => {
  await dispatch(createValidate(actionPrefix)());

  const state = getState();
  const {
    entities: { rocniky, ucastnici },
    registrator: {
      [reduxName]: { form }
    }
  } = state;

  const errors = formErrors({ form, rocniky });
  if (errors.length > 0) {
    dispatch(createValidationError(actionPrefix)(errors));
    return;
  }

  dispatch(createSaveUcastRequest(actionPrefix)());

  const rok = AKTUALNI_ROK;
  const existingUcast = form.ucastnikId ? ucastnici.byIds[form.ucastnikId][rok] || {} : {};
  const { udaje, prihlaska, platby, ubytovani } = form;
  const ucast = { ...existingUcast, udaje, prihlaska, platby, ubytovani };

  try {
    const response = await wsClient.sendRequest(
      saveUcast({ id: form.ucastnikId, rok, ...ucast }, state.auth.token)
    );
    if (response.code !== CODE_OK) {
      handleErrors({ actionPrefix, dispatch, response });
      return;
    }

    const { id } = response.response;
    dispatch(createSaveUcastSuccess(actionPrefix)({ id, rok, ...ucast }));
    showModalWithTimeout(actionPrefix, dispatch);
  } catch (err) {
    dispatch(createSaveUcastError(actionPrefix)({ code: 'internal error', err }));
  }
};
