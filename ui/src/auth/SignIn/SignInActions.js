import jwtDecode from 'jwt-decode';
import { CODE_OK, CODE_NONCE_MISMATCH, signIn as signInAction } from '../../common';

export const generateNonce = (len = 20) => {
  const arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, val => val.toString(16)).join('');
};

const signInRequest = () => ({
  type: 'SIGN_IN_REQUEST'
});

const decodeToken = token => jwtDecode(token);

export const signInSuccess = response => ({
  type: 'SIGN_IN_SUCCESS',
  data: response,
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
const signInError = ({ code, status, err, ...rest }) => ({
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
    const { code, status, response } = await wsClient.sendRequest(
      signInAction(username, password, nonce)
    );
    if (code === CODE_OK) {
      const token = decodeToken(response.token);
      if (token.nonce === nonce) {
        response.token = token;
        dispatch(signInSuccess(response));
      } else {
        dispatch(
          signInError({
            code: CODE_NONCE_MISMATCH,
            status:
              'Jednorázový přihlašovací kód vygenerovaný prohlížečem nesouhlasí s kódem, který poslal server.',
            client: nonce,
            server: token.nonce
          })
        );
      }
    } else {
      dispatch(signInError({ code, status }));
    }
  } catch (err) {
    dispatch(signInError({ code: 'internal error', err }));
  }
};
