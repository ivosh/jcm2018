import { CODE_OK, signOut as signOutAction } from '../../common';

export const signOutRequest = () => ({
  type: 'SIGN_OUT_REQUEST'
});

export const signOutSuccess = () => ({
  type: 'SIGN_OUT_SUCCESS',
  receivedAt: Date.now()
});

export const signOutError = ({ code, status, err, ...rest }) => ({
  type: 'SIGN_OUT_ERROR',
  code,
  status,
  err,
  ...rest,
  receivedAt: Date.now()
});

export const signOut = () => async (dispatch, getState, wsClient) => {
  const { auth } = getState();
  if (!auth.authenticated) {
    return;
  }

  dispatch(signOutRequest());

  try {
    const response = await wsClient.sendRequest(signOutAction(auth.token));
    const { code } = response;
    if (code === CODE_OK) {
      dispatch(signOutSuccess());
    } else {
      dispatch(signOutError(response));
    }
  } catch (err) {
    dispatch(signOutError({ code: 'internal error', err }));
  }
};
