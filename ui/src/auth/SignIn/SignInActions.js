import jwtDecode from 'jwt-decode';
import { CODE_OK, CODE_NONCE_MISMATCH, signIn as signInAction } from '../../common';

export const hideSignInError = () => ({ type: 'SIGN_IN_HIDE_ERROR' });

export const generateNonce = (len = 20) => {
  const arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, val => val.toString(16)).join('');
};

export const signInRequest = () => ({
  type: 'SIGN_IN_REQUEST'
});

const decodeToken = token => jwtDecode(token);

export const signInSuccess = json => {
  const { username, token, decodedToken } = json.response;

  return {
    type: 'SIGN_IN_SUCCESS',
    username,
    token,
    decodedToken,
    receivedAt: Date.now()
  };
};

export const signInError = ({ code, status, err, ...rest }) => ({
  type: 'SIGN_IN_ERROR',
  code,
  status,
  err,
  ...rest,
  receivedAt: Date.now()
});

export const signIn = (username, password) => async (dispatch, getState, wsClient) => {
  dispatch(signInRequest());

  const nonce = generateNonce();
  try {
    const response = await wsClient.sendRequest(signInAction(username, password, nonce));
    const { code } = response;
    if (code === CODE_OK) {
      const decodedToken = decodeToken(response.response.token);
      if (decodedToken.nonce === nonce) {
        response.response.decodedToken = decodedToken;
        dispatch(signInSuccess(response));
      } else {
        dispatch(
          signInError({
            code: CODE_NONCE_MISMATCH,
            status:
              'Jednorázový přihlašovací kód vygenerovaný prohlížečem nesouhlasí s kódem, který poslal server.',
            client: nonce,
            server: decodedToken.nonce
          })
        );
      }
    } else {
      dispatch(signInError(response));
    }
  } catch (err) {
    dispatch(signInError({ code: 'internal error', err }));
  }
};
