import { CODE_OK } from '../../common';
import { prihlaseniValid } from './prihlaseniReducer';

export const hideError = () => ({ type: 'PRIHLASENI_HIDE_ERROR' });

export const inputChanged = (name, event) => ({
  type: 'PRIHLASENI_INPUT_CHANGED',
  name,
  value: event.target.value
});

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

export const saveUcastSuccess = json => ({
  type: 'PRIHLASENI_SAVE_SUCCESS',
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

export const saveUcast = () => async (dispatch, getState, wsClient) => {
  await dispatch(validateEmpty());

  const { registrator: { prihlaseni } } = getState();
  if (!prihlaseniValid(prihlaseni)) {
    dispatch(validationError());
    return;
  }

  dispatch(saveUcastRequest());

  try {
    const response = await wsClient.sendRequest(
      saveUcast(prihlaseni.ucastnikId, prihlaseni.udaje, prihlaseni.prihlaska)
    );
    const { code } = response;
    if (code === CODE_OK) {
      dispatch(saveUcastSuccess(response));
    } else {
      dispatch(saveUcastError(response));
    }
  } catch (err) {
    dispatch(saveUcastError({ code: 'internal error', err }));
  }
};
