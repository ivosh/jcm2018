import { CODE_OK, CODE_TOKEN_INVALID, apiCall } from '../common';
import { errorToStr } from '../Util';

// Action key that carries API call info interpreted by this Redux middleware.
export const WS_API = 'Websocket API';

const getRequest = (request, state) => (typeof request === 'function' ? request(state) : request);

const createSuccess = ({
  type,
  decorate = () => {},
  normalize = data => data,
  request,
  response = {}
}) => ({
  type: `${type}_SUCCESS`,
  request,
  response: { ...normalize(response), code: response.code, status: response.status },
  receivedAt: Date.now(),
  ...decorate(response)
});

// For testing.
// state is required only if request is not supplied and needs to be created using a function.
export const createSuccessFromAction = ({ action, request, response, state }) => {
  const { [WS_API]: callAPI } = action;
  const { decorate, normalize, type } = callAPI;
  if (!request) {
    request = getRequest(callAPI.request, state); // eslint-disable-line no-param-reassign
  }
  return createSuccess({ type, decorate, normalize, request, response });
};

const createFailure = ({ type, error, request, response }) => ({
  type: `${type}_ERROR`,
  error: errorToStr(error),
  request,
  response,
  receivedAt: Date.now()
});

const createAuthTokenExpired = ({ response, ...rest }) =>
  createFailure({
    ...rest,
    response: {
      ...response,
      status: `Platnost ověřovacího tokenu pravděpodobně vypršela. ${response.status}`
    }
  });

// For testing.
// state is required only if request is not supplied and needs to be created using a function.
export const createFailureFromAction = ({ action, error, request, response, state }) => {
  const { [WS_API]: callAPI } = action;
  const { type } = callAPI;
  if (!request) {
    request = getRequest(callAPI.request, state); // eslint-disable-line no-param-reassign
  }
  return createFailure({ type, error, request, response });
};

// Processes an array of actions and applies function 'fn' on every item.
// The function 'fn' returns a promise which is waited upon.
const processArray = (actions, fn, data) =>
  actions.reduce(
    (last, current) => last.then(() => fn({ action: current, ...data }).then()),
    Promise.resolve()
  );

const doOneAction = ({ action, next, store, wsClient }) => {
  const { [WS_API]: callAPI } = action;
  if (!callAPI) {
    return next(action);
  }

  const state = store.getState();
  const { decorate, endpoint, normalize, type, useCached } = callAPI;
  const request = getRequest(callAPI.request, state);
  if (!endpoint) {
    throw new Error('Specify an API endpoint.');
  }
  if (!type) {
    throw new Error('Specify a redux name for API endpoint.');
  }

  if (useCached && useCached(state)) {
    return Promise.resolve();
  }

  next({ type: `${type}_REQUEST`, request, receivedAt: Date.now() });

  return wsClient.sendRequest(apiCall({ endpoint, request, token: state.auth.token })).then(
    response => {
      const { code } = response;
      switch (code) {
        case CODE_OK:
          return next(createSuccess({ type, decorate, normalize, request, response }));
        case CODE_TOKEN_INVALID:
          return next(createAuthTokenExpired({ type, request, response }));
        default:
          return next(createFailure({ type, request, response }));
      }
    },
    error => next(createFailure({ type, error, request, response: { code: 'internal error' } }))
  );
};

// A Redux middleware that interprets actions with WS_API info specified.
// Performs the call and promises when such actions are dispatched.
// eslint-disable-next-line arrow-body-style
const createWsAPIMiddleware = wsClient => {
  return store => next => actions =>
    Array.isArray(actions)
      ? processArray(actions, doOneAction, { next, store, wsClient })
      : doOneAction({ action: actions, next, store, wsClient });
};

const wsAPI = createWsAPIMiddleware();
wsAPI.withExtraArgument = createWsAPIMiddleware;

export default wsAPI;
