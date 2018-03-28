import { CODE_OK, saveUbytovani as saveUbytovaniAPI } from '../../common';
import { AKTUALNI_ROK, UBYTOVANI_SAVE_SUCCESS_TIMEOUT } from '../../constants';

export const changeUbytovani = () => ({
  type: 'UBYTOVANI_CHANGE_UBYTOVANI'
});

export const saveUbytovaniRequest = ({ id, rok }) => ({ type: 'UBYTOVANI_SAVE_REQUEST', id, rok });

export const saveUbytovaniError = ({ code, status, err, ...rest }) => ({
  type: 'UBYTOVANI_SAVE_ERROR',
  code,
  status,
  err,
  ...rest,
  receivedAt: Date.now()
});

export const hideError = () => ({ type: 'UBYTOVANI_HIDE_ERROR' });
export const showError = () => ({ type: 'UBYTOVANI_SHOW_ERROR' });

export const hideSuccess = ({ id, rok }) => ({
  type: 'UBYTOVANI_SAVE_HIDE_SUCCESS',
  id,
  rok,
  receivedAt: Date.now()
});
export const showSuccess = ({ id, rok, ubytovani }) => ({
  type: 'UBYTOVANI_SAVE_SUCCESS',
  id,
  rok,
  ubytovani,
  receivedAt: Date.now()
});
export const saveUbytovaniSuccessWithTimeout = ({ dispatch, id, rok, ubytovani }) => {
  dispatch(showSuccess({ id, rok, ubytovani }));
  setTimeout(() => dispatch(hideSuccess({ id, rok })), UBYTOVANI_SAVE_SUCCESS_TIMEOUT);
};

export const saveUbytovani = ({ id, den = 'pátek', reducer }) => async (
  dispatch,
  getState,
  wsClient
) => {
  const rok = AKTUALNI_ROK;
  dispatch(saveUbytovaniRequest({ id, rok }));

  const state = getState();
  const ubytovani = reducer({ den, ubytovani: state.entities.ucastnici.byIds[id][rok].ubytovani });

  try {
    const response = await wsClient.sendRequest(
      saveUbytovaniAPI({ id, rok, ubytovani }, state.auth.token)
    );
    if (response.code === CODE_OK) {
      saveUbytovaniSuccessWithTimeout({ dispatch, id, rok, ubytovani });
    } else {
      dispatch(saveUbytovaniError(response));
    }
  } catch (err) {
    dispatch(saveUbytovaniError({ code: 'internal error', err }));
  }
};
