import {
  CODE_OK,
  CODE_TOKEN_INVALID,
  savePlatby,
  savePrihlaska,
  saveUbytovani,
  saveUdaje
} from '../../../common';
import { AKTUALNI_ROK, PRIHLASKY_SAVE_MODAL_TIMEOUT } from '../../../constants';
import { errorToStr } from '../../../Util';
import { authTokenExpired } from '../../../auth/SignIn/SignInActions';
import { createInputChanged as genericCreateInputChanged } from '../Input/InputActions';
import { formValid } from './prihlaskyFormReducer';

export const createInputChanged = actionPrefix => genericCreateInputChanged(actionPrefix);

export const createHideError = actionPrefix => () => ({ type: `${actionPrefix}_HIDE_ERROR` });

export const createReset = actionPrefix => () => ({ type: `${actionPrefix}_RESET` });

export const createLoadUcastnik = actionPrefix => ({ id, kategorie, ucastnici }) => {
  const ucastnik = ucastnici.byIds[id];
  const posledniRok = ucastnik.roky[0];
  const ucast = ucastnik[posledniRok];
  const action = {
    type: `${actionPrefix}_UCASTNIK_LOAD`,
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

export const createValidationError = actionPrefix => () => ({
  type: `${actionPrefix}_FORM_INVALID`,
  code: 'nejde uložit',
  status: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.'
});

export const createSaveUcastRequest = actionPrefix => () => ({
  type: `${actionPrefix}_SAVE_REQUEST`
});

export const createSaveUcastSuccess = actionPrefix => ({
  id,
  rok,
  udaje,
  prihlaska,
  platby = [],
  ubytovani = {}
}) => {
  const { typ, ...jenPrihlaska } = prihlaska;

  return {
    type: `${actionPrefix}_SAVE_SUCCESS`,
    id,
    rok,
    udaje,
    prihlaska: jenPrihlaska,
    platby,
    ubytovani,
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
    dispatch(authTokenExpired(response));
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
    registrator: {
      [reduxName]: { form }
    }
  } = state;
  if (!formValid({ form, rocniky: state.entities.rocniky })) {
    dispatch(createValidationError(actionPrefix)());
    return;
  }

  dispatch(createSaveUcastRequest(actionPrefix)());

  const rok = AKTUALNI_ROK;
  const { udaje, prihlaska, platby, ubytovani } = form;
  try {
    let response = await wsClient.sendRequest(
      saveUdaje(
        {
          id: form.ucastnikId,
          rok,
          udaje
        },
        state.auth.token
      )
    );
    if (response.code !== CODE_OK) {
      handleErrors({ actionPrefix, dispatch, response });
      return;
    }

    const { id } = response.response;
    response = await wsClient.sendRequest(savePrihlaska({ id, rok, prihlaska }, state.auth.token));
    if (response.code !== CODE_OK) {
      handleErrors({ actionPrefix, dispatch, response });
      return;
    }

    response = await wsClient.sendRequest(savePlatby({ id, rok, platby }, state.auth.token));
    if (response.code !== CODE_OK) {
      handleErrors({ actionPrefix, dispatch, response });
      return;
    }

    response = await wsClient.sendRequest(saveUbytovani({ id, rok, ubytovani }, state.auth.token));
    if (response.code === CODE_OK) {
      dispatch(
        createSaveUcastSuccess(actionPrefix)({ id, rok, udaje, prihlaska, platby, ubytovani })
      );
      showModalWithTimeout(actionPrefix, dispatch);
    } else {
      handleErrors({ actionPrefix, dispatch, response });
    }
  } catch (err) {
    dispatch(createSaveUcastError(actionPrefix)({ code: 'internal error', err }));
  }
};
