import { CODE_OK, saveStopky as saveStopkyAPI } from '../../../common';
import stopkyProTypReducer, { getStopkyByTyp } from './stopkyProTypReducer';

export const stopkyStart = ({ now = new Date() } = {}) => ({ type: 'STOPKY_START', now });
export const stopkyStop = ({ now = new Date() } = {}) => ({ type: 'STOPKY_STOP', now });
// step is in milliseconds
export const stopkyChange = ({ step }) => ({ type: 'STOPKY_CHANGE', step });

export const saveStopkyRequest = ({ typ }) => ({ type: 'SAVE_STOPKY_REQUEST', typ });

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
  dispatch(saveStopkyRequest({ typ }));

  const state = getState();
  const stopky = stopkyProTypReducer(getStopkyByTyp({ state, typ }), action);

  try {
    const response = await wsClient.sendRequest(saveStopkyAPI(stopky, state.auth.token));
    if (response.code === CODE_OK) {
      dispatch(saveStopkySuccess({ stopky, typ }));
    } else {
      dispatch(saveStopkyError(response, typ));
    }
  } catch (err) {
    dispatch(saveStopkyError({ code: 'internal error', err }, typ));
  }
};
