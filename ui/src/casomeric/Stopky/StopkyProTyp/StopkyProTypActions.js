import { saveStopky as saveStopkyAPI, CODE_OK, CODE_TOKEN_INVALID } from '../../../common';
import { authTokenExpired } from '../../../auth/SignIn/SignInActions';
import stopkyProTypReducer, { getStopkyByTyp } from './stopkyProTypReducer';

export const stopkyAddMezicas = ({ now = new Date() } = {}) => ({
  type: 'STOPKY_ADD_MEZICAS',
  now
});
export const stopkyRemoveMezicas = ({ cas }) => ({
  type: 'STOPKY_REMOVE_MEZICAS',
  cas: cas.toJSON ? cas.toJSON() : cas
});
export const stopkyReset = () => ({ type: 'STOPKY_RESET' });
export const stopkyStart = ({ now = new Date() } = {}) => ({ type: 'STOPKY_START', now });
export const stopkyStop = ({ now = new Date() } = {}) => ({ type: 'STOPKY_STOP', now });
// step is in milliseconds
export const stopkyChange = ({ step }) => ({ type: 'STOPKY_CHANGE', step });

export const saveStopkyRequest = ({ action, stopky, typ }) => ({
  type: 'SAVE_STOPKY_REQUEST',
  action,
  stopky,
  typ
});

export const saveStopkySuccess = ({ stopky, typ }) => ({
  type: 'SAVE_STOPKY_SUCCESS',
  stopky,
  typ,
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
const saveStopkyError = ({ code, status, err }, typ) => ({
  type: 'SAVE_STOPKY_ERROR',
  code,
  status,
  err,
  typ,
  receivedAt: Date.now()
});

export const saveStopky = ({ action, typ }) => async (dispatch, getState, wsClient) => {
  const state = getState();
  const stopky = stopkyProTypReducer(getStopkyByTyp({ state, typ }), action);
  stopky.typ = typ;
  dispatch(saveStopkyRequest({ action, stopky, typ }));

  try {
    const response = await wsClient.sendRequest(saveStopkyAPI(stopky, state.auth.token));
    if (response.code === CODE_OK) {
      dispatch(saveStopkySuccess({ stopky, typ }));
    } else if (response.code === CODE_TOKEN_INVALID) {
      dispatch(authTokenExpired(response));
    } else {
      dispatch(saveStopkyError(response, typ));
    }
  } catch (err) {
    dispatch(saveStopkyError({ code: 'internal error', err }, typ));
  }
};
