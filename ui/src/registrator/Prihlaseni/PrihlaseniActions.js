import { CODE_OK, CODE_TOKEN_INVALID, savePrihlaska, saveUdaje } from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import { authTokenExpired } from '../../auth/SignIn/SignInActions';
import { prihlaseniValid } from './prihlaseniReducer';

export const hideError = () => ({ type: 'PRIHLASENI_HIDE_ERROR' });

export const inputChanged = (name, event) => ({
  type: 'PRIHLASENI_INPUT_CHANGED',
  name,
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

  // TODO: Předvyplň přihlášku jen pro aktuální rok. Pro minulé roky na to prdíme.
  const typKategorie = kategorie[ucast.prihlaska.kategorie];
  return action;
};

export const reset = () => ({
  type: 'PRIHLASENI_RESET'
});

const validateEmpty = () => ({ type: 'PRIHLASENI_VALIDATE_EMPTY' });

const validationError = () => ({
  type: 'PRIHLASENI_FORM_INVALID',
  code: 'nejde uložit',
  status: 'Přihláška nejde uložit. Povinná pole nejsou vyplněna.'
});

export const saveUcastRequest = () => ({
  type: 'PRIHLASENI_SAVE_REQUEST'
});

export const saveUcastSuccess = id => ({
  type: 'PRIHLASENI_SAVE_SUCCESS',
  id,
  receivedAt: Date.now()
});

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

export const saveUcast = () => async (dispatch, getState, wsClient) => {
  await dispatch(validateEmpty());

  const state = getState();
  const { registrator: { prihlaseni } } = state;
  if (!prihlaseniValid(prihlaseni)) {
    dispatch(validationError());
    return;
  }

  dispatch(saveUcastRequest());

  try {
    let response = await wsClient.sendRequest(
      saveUdaje(
        {
          id: prihlaseni.ucastnikId,
          rok: AKTUALNI_ROK,
          udaje: prihlaseni.udaje
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
          rok: AKTUALNI_ROK,
          prihlaska: prihlaseni.prihlaska
        },
        state.auth.token
      )
    );
    if (response.code === CODE_OK) {
      dispatch(saveUcastSuccess(id));
    } else {
      handleErrors(dispatch, response);
    }
  } catch (err) {
    dispatch(saveUcastError({ code: 'internal error', err }));
  }
};
