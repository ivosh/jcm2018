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
import { inputChanged as genericInputChanged } from '../Input/InputActions';
import { formValid } from './prihlaskyFormReducer';

export const inputChanged = genericInputChanged('PRIHLASKY');

export const hideError = () => ({ type: 'PRIHLASKY_HIDE_ERROR' });

export const reset = () => ({
  type: 'PRIHLASKY_RESET'
});

export const loadUcastnik = ({ id, kategorie, ucastnici }) => {
  const ucastnik = ucastnici.byIds[id];
  const posledniRok = ucastnik.roky[0];
  const ucast = ucastnik[posledniRok];
  const action = {
    type: 'PRIHLASKY_UCASTNIK_LOAD',
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

const validate = () => ({ type: 'PRIHLASKY_VALIDATE_FORM' });

const validationError = () => ({
  type: 'PRIHLASKY_FORM_INVALID',
  code: 'nejde uložit',
  status: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.'
});

export const saveUcastRequest = () => ({
  type: 'PRIHLASKY_SAVE_REQUEST'
});

export const saveUcastSuccess = ({ id, rok, udaje, prihlaska, platby = [], ubytovani = {} }) => {
  const { typ, ...jenPrihlaska } = prihlaska;

  return {
    type: 'PRIHLASKY_SAVE_SUCCESS',
    id,
    rok,
    udaje,
    prihlaska: jenPrihlaska,
    platby,
    ubytovani,
    receivedAt: Date.now()
  };
};

export const saveUcastError = ({ code, status, err, ...rest }) => ({
  type: 'PRIHLASKY_SAVE_ERROR',
  code,
  status,
  err: errorToStr(err),
  ...rest,
  receivedAt: Date.now()
});

const handleErrors = (dispatch, response) => {
  if (response.code === CODE_TOKEN_INVALID) {
    dispatch(authTokenExpired(response));
  } else {
    dispatch(saveUcastError(response));
  }
};

export const hideModal = () => ({ type: 'PRIHLASKY_SAVE_HIDE_MODAL' });
export const showModal = () => ({ type: 'PRIHLASKY_SAVE_SHOW_MODAL' });
const showModalWithTimeout = dispatch => {
  dispatch(showModal());
  setTimeout(() => dispatch(hideModal()), PRIHLASKY_SAVE_MODAL_TIMEOUT);
};

export const saveUcast = () => async (dispatch, getState, wsClient) => {
  await dispatch(validate());

  const state = getState();
  const {
    registrator: {
      prihlasky: { form }
    }
  } = state;
  if (!formValid({ form, rocniky: state.entities.rocniky })) {
    dispatch(validationError());
    return;
  }

  dispatch(saveUcastRequest());

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
      handleErrors(dispatch, response);
      return;
    }

    const { id } = response.response;
    response = await wsClient.sendRequest(savePrihlaska({ id, rok, prihlaska }, state.auth.token));
    if (response.code !== CODE_OK) {
      handleErrors(dispatch, response);
      return;
    }

    response = await wsClient.sendRequest(savePlatby({ id, rok, platby }, state.auth.token));
    if (response.code !== CODE_OK) {
      handleErrors(dispatch, response);
      return;
    }

    response = await wsClient.sendRequest(saveUbytovani({ id, rok, ubytovani }, state.auth.token));
    if (response.code === CODE_OK) {
      dispatch(saveUcastSuccess({ id, rok, udaje, prihlaska, platby, ubytovani }));
      showModalWithTimeout(dispatch);
    } else {
      handleErrors(dispatch, response);
    }
  } catch (err) {
    dispatch(saveUcastError({ code: 'internal error', err }));
  }
};