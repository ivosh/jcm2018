import { CODE_OK, CODE_TOKEN_INVALID, apiCall } from '../common';
import { errorToStr } from '../Util';

// Action key that carries API call info interpreted by this Redux middleware.
export const WS_API = 'Websocket API';

export const createSuccess = ({ type, normalize = data => data, request, response = {} }) => ({
  type: `${type}_SUCCESS`,
  request,
  response: { ...normalize(response), code: response.code, status: response.status },
  receivedAt: Date.now()
});

export const createFailure = ({ type, error, request, response }) => ({
  type: `${type}_ERROR`,
  error: errorToStr(error),
  request,
  response,
  receivedAt: Date.now()
});

export const createAuthTokenExpired = ({ response, ...rest }) =>
  createFailure({
    ...rest,
    response: {
      ...response,
      status: `Platnost ověřovacího tokenu pravděpodobně vypršela. ${response.status}`
    }
  });

// A Redux middleware that interprets actions with WS_API info specified.
// Performs the call and promises when such actions are dispatched.
// eslint-disable-next-line arrow-body-style
const createWsAPIMiddleware = wsClient => {
  return store => next => action => {
    const { [WS_API]: callAPI } = action;
    if (!callAPI) {
      return next(action);
    }

    const state = store.getState();
    const { endpoint, normalize, type } = callAPI;
    let { request } = callAPI;
    if (typeof request === 'function') {
      request = request(state);
    }
    if (!endpoint) {
      throw new Error('Specify an API endpoint.');
    }
    if (!type) {
      throw new Error('Specify a redux name for API endpoint.');
    }

    next({ type: `${type}_REQUEST`, request, receivedAt: Date.now() });

    return wsClient.sendRequest(apiCall({ endpoint, request, token: state.auth.token })).then(
      response => {
        const { code } = response;
        switch (code) {
          case CODE_OK:
            return next(createSuccess({ type, normalize, request, response }));
          case CODE_TOKEN_INVALID:
            return next(createAuthTokenExpired({ type, request, response }));
          default:
            return next(createFailure({ type, request, response }));
        }
      },
      error => next(createFailure({ type, error, request, response: { code: 'internal error' } }))
    );
  };
};

const wsAPI = createWsAPIMiddleware();
wsAPI.withExtraArgument = createWsAPIMiddleware;

export default wsAPI;
