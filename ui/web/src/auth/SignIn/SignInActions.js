import jwtDecode from 'jwt-decode';
import { WS_API } from 'ui-common/store/wsAPI';
import { API_SIGN_IN, CODE_OK, CODE_NONCE_MISMATCH, CODE_TOKEN_INVALID } from 'ui-common/common';

export const generateNonce = (len = 20) => {
  const arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, val => val.toString(16)).join('');
};

const decodeToken = token => jwtDecode(token);

const checkResponse = ({ request, response }) => {
  let decodedToken;
  try {
    decodedToken = decodeToken(response.response.token);
  } catch (error) {
    return {
      code: CODE_TOKEN_INVALID,
      status: 'Špatný přihlašovací token. Zkus se přihlásit znovu.',
      token: response.response.token
    };
  }

  if (decodedToken.nonce === request.nonce) {
    return { code: CODE_OK, decodedToken };
  }

  return {
    code: CODE_NONCE_MISMATCH,
    status:
      'Jednorázový přihlašovací kód vygenerovaný prohlížečem nesouhlasí s kódem, který poslal server.',
    client: request.nonce,
    server: decodedToken.nonce
  };
};

const normalize = ({
  request,
  response: {
    check: { client, code, decodedToken, server, status } = {},
    response: { token, username }
  }
}) => ({ request, response: { client, code, decodedToken, server, status, token, username } });

export const SIGN_IN = 'SIGN_IN';
export const signIn = ({ username, password }) => ({
  [WS_API]: {
    type: SIGN_IN,
    checkResponse,
    dontUseToken: true,
    endpoint: API_SIGN_IN,
    normalize,
    request: () => ({ username, password, nonce: generateNonce() }),
    title: 'přihlašování'
  }
});
