import {
  CODE_OK,
  saveUbytovani as saveUbytovaniAPI,
  ubytovaniNeprespano,
  ubytovaniOdhlasit,
  ubytovaniPrespano,
  ubytovaniPrihlasit
} from '../../common';
import { AKTUALNI_ROK } from '../../constants';

export const changeUbytovani = () => ({
  type: 'UBYTOVANI_CHANGE_UBYTOVANI'
});

export const saveUbytovaniRequest = ({ id, rok }) => ({
  type: 'UBYTOVANI_SAVE_REQUEST',
  id,
  rok,
  receivedAt: Date.now()
});

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

export const saveUbytovaniSuccess = ({ id, rok, ubytovani }) => ({
  type: 'UBYTOVANI_SAVE_SUCCESS',
  id,
  rok,
  ubytovani,
  receivedAt: Date.now()
});

const reducers = {
  Nepřespáno: ubytovaniNeprespano,
  Odhlásit: ubytovaniOdhlasit,
  Přespáno: ubytovaniPrespano,
  Přihlásit: ubytovaniPrihlasit
};

export const saveUbytovani = ({ akce, den = 'pátek', id }) => async (
  dispatch,
  getState,
  wsClient
) => {
  const reducer = reducers[akce];
  if (!reducer) {
    return;
  }

  const rok = AKTUALNI_ROK;
  dispatch(saveUbytovaniRequest({ id, rok }));

  const state = getState();
  const ubytovani = reducer({ den, ubytovani: state.entities.ucastnici.byIds[id][rok].ubytovani });

  try {
    const response = await wsClient.sendRequest(
      saveUbytovaniAPI({ id, rok, ubytovani }, state.auth.token)
    );
    if (response.code === CODE_OK) {
      dispatch(saveUbytovaniSuccess({ id, rok, ubytovani }));
    } else {
      dispatch(saveUbytovaniError(response));
    }
  } catch (err) {
    dispatch(saveUbytovaniError({ code: 'internal error', err }));
  }
};
