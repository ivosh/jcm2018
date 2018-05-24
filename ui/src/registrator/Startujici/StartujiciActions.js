import { CODE_OK, deleteVykon as deleteVykonAPI, saveVykon } from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import { errorToStr } from '../../Util';

export const createVykonRequest = ({ id, rok }) => ({
  type: 'STARTUJICI_CREATE_VYKON_REQUEST',
  id,
  rok,
  receivedAt: Date.now()
});

export const createVykonError = ({ code, status, err, ...rest }) => ({
  type: 'STARTUJICI_CREATE_VYKON_ERROR',
  code,
  status,
  err: errorToStr(err),
  ...rest,
  receivedAt: Date.now()
});

export const createVykonSuccess = ({ id, rok, vykon }) => ({
  type: 'STARTUJICI_CREATE_VYKON_SUCCESS',
  id,
  rok,
  vykon,
  receivedAt: Date.now()
});

export const createVykon = ({ id }) => async (dispatch, getState, wsClient) => {
  const rok = AKTUALNI_ROK;
  dispatch(createVykonRequest({ id, rok }));

  const state = getState();
  const { kategorie, startCislo } = state.entities.ucastnici.byIds[id][rok].prihlaska;
  const vykon = { dokonceno: null, kategorie, startCislo };

  try {
    const response = await wsClient.sendRequest(saveVykon({ id, rok, vykon }, state.auth.token));
    if (response.code === CODE_OK) {
      dispatch(createVykonSuccess({ id, rok, vykon }));
    } else {
      dispatch(createVykonError(response));
    }
  } catch (err) {
    dispatch(createVykonError({ code: 'internal error', err }));
  }
};

export const deleteVykonRequest = ({ id, rok }) => ({
  type: 'STARTUJICI_DELETE_VYKON_REQUEST',
  id,
  rok,
  receivedAt: Date.now()
});

export const deleteVykonError = ({ code, status, err, ...rest }) => ({
  type: 'STARTUJICI_DELETE_VYKON_ERROR',
  code,
  status,
  err: errorToStr(err),
  ...rest,
  receivedAt: Date.now()
});

export const deleteVykonSuccess = ({ id, rok }) => ({
  type: 'STARTUJICI_DELETE_VYKON_SUCCESS',
  id,
  rok,
  receivedAt: Date.now()
});

export const deleteVykon = ({ id }) => async (dispatch, getState, wsClient) => {
  const rok = AKTUALNI_ROK;
  dispatch(deleteVykonRequest({ id, rok }));

  const state = getState();
  try {
    const response = await wsClient.sendRequest(deleteVykonAPI({ id, rok }, state.auth.token));
    if (response.code === CODE_OK) {
      dispatch(deleteVykonSuccess({ id, rok }));
    } else {
      dispatch(deleteVykonError(response));
    }
  } catch (err) {
    dispatch(deleteVykonError({ code: 'internal error', err }));
  }
};
