import { CODE_OK, CODE_TOKEN_INVALID, savePrihlaska, saveUdaje } from '../../common';
import { AKTUALNI_ROK, PRIHLASENI_SAVE_MODAL_TIMEOUT } from '../../constants';
import { authTokenExpired } from '../../auth/SignIn/SignInActions';
import { formValid } from './prihlaseniReducer';

export const hideError = () => ({ type: 'PRIHLASENI_HIDE_ERROR' });

export const inputChanged = (name, event) => ({
  type: 'PRIHLASENI_INPUT_CHANGED',
  name,
  id: event.target.id,
  value: event.target.value
});

export const ucastnikSelected = ({ id }, kategorie, ucastnici) => {
  const ucastnik = ucastnici.byIds[id];
  const posledniRok = ucastnik.roky[0];
  const ucast = ucastnik[posledniRok];
  const action = {
    type: 'PRIHLASENI_UCASTNIK_SELECTED',
    id,
    udaje: ucast.udaje
  };

  const letosniUcast = ucastnik[AKTUALNI_ROK];
  if (letosniUcast) {
    // Předvyplň přihlášku jen pro aktuální rok. Pro minulé roky na to prdíme.
    const { typ } = kategorie[letosniUcast.prihlaska.kategorie];
    action.prihlaska = { ...letosniUcast.prihlaska, typ };
  }
  return action;
};

export const reset = () => ({
  type: 'PRIHLASENI_RESET'
});

const validateForm = () => ({ type: 'PRIHLASENI_VALIDATE_FORM' });

const validationError = () => ({
  type: 'PRIHLASENI_FORM_INVALID',
  code: 'nejde uložit',
  status: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.'
});

export const saveUcastRequest = () => ({
  type: 'PRIHLASENI_SAVE_REQUEST'
});

export const saveUcastSuccess = ({ id, rok, udaje, prihlaska }) => {
  const { typ, ...jenPrihlaska } = prihlaska;

  return {
    type: 'PRIHLASENI_SAVE_SUCCESS',
    id,
    rok,
    udaje,
    prihlaska: jenPrihlaska,
    receivedAt: Date.now()
  };
};

export const saveUcastError = ({ code, status, err, ...rest }) => ({
  type: 'PRIHLASENI_SAVE_ERROR',
  code,
  status,
  err,
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

export const hideModal = () => ({ type: 'PRIHLASENI_SAVE_MODAL_HIDE' });
const showModal = () => ({ type: 'PRIHLASENI_SAVE_MODAL_SHOW' });
const showModalWithTimeout = dispatch => {
  dispatch(showModal());
  setTimeout(() => dispatch(hideModal()), PRIHLASENI_SAVE_MODAL_TIMEOUT);
};

export const saveUcast = () => async (dispatch, getState, wsClient) => {
  await dispatch(validateForm());

  const state = getState();
  const { registrator: { prihlaseni } } = state;
  if (!formValid(prihlaseni)) {
    dispatch(validationError());
    return;
  }

  dispatch(saveUcastRequest());

  const rok = AKTUALNI_ROK;
  const { udaje, prihlaska } = prihlaseni;
  try {
    let response = await wsClient.sendRequest(
      saveUdaje(
        {
          id: prihlaseni.ucastnikId,
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
    response = await wsClient.sendRequest(
      savePrihlaska(
        {
          id,
          rok,
          prihlaska
        },
        state.auth.token
      )
    );
    if (response.code === CODE_OK) {
      dispatch(saveUcastSuccess({ id, rok, udaje, prihlaska }));
      showModalWithTimeout(dispatch);
    } else {
      handleErrors(dispatch, response);
    }
  } catch (err) {
    dispatch(saveUcastError({ code: 'internal error', err }));
  }
};

/* ------------------------------------- platby ------------------------------------------------- */

const addPlatba = () => ({ type: 'PRIHLASENI_PLATBA_ADD' });
const validatePlatba = () => ({ type: 'PRIHLASENI_VALIDATE_PLATBA' });

export const addValidatedPlatba = dispatch => {
  dispatch(validatePlatba());
  dispatch(addPlatba());
};

export const removePlatba = idx => ({ type: 'PRIHLASENI_PLATBA_REMOVE', idx });
