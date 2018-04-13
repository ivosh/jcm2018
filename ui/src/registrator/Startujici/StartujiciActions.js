import { CODE_OK, saveVykon } from '../../common';
import { AKTUALNI_ROK } from '../../constants';

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
  err,
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
  const vykon = { kategorie, startCislo };

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
