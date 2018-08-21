import { CODE_OK, CODE_TOKEN_INVALID, apiCall } from '../common';
import { errorToStr } from '../Util';

// Action key that carries API call info interpreted by this Redux middleware.
export const WS_API = 'Websocket API';

const getRequest = (request, state) => (typeof request === 'function' ? request(state) : request);

const createRequest = ({ type, request }) => ({
  type: `${type}_REQUEST`,
  request,
  receivedAt: Date.now()
});

// For testing.
// state is required only if request is not supplied and needs to be created using a function.
export const createRequestFromAction = ({ action, request, state }) => {
  const { [WS_API]: callAPI } = action;
  const { type } = callAPI;
  if (!request) {
    request = getRequest(callAPI.request, state); // eslint-disable-line no-param-reassign
  }
  return createRequest({ type, request });
};

const createSuccess = ({
  type,
  checkResponse,
  decorate = () => {},
  normalize = data => data, // Called also for client-created failures (SignIn nonce check).
  request,
  response = {},
  title
}) => {
  let suffix = 'SUCCESS';

  if (checkResponse) {
    const checkResult = checkResponse({ request, response });
    response = { ...response, check: checkResult }; // eslint-disable-line no-param-reassign
    if (checkResult.code !== CODE_OK) {
      suffix = 'ERROR';
    }
  }

  return {
    type: `${type}_${suffix}`,
    request,
    response: { code: response.code, status: response.status, ...normalize(response) },
    title,
    receivedAt: Date.now(),
    ...decorate(response)
  };
};

// For testing.
// state is required only if request is not supplied and needs to be created using a function.
export const createSuccessFromAction = ({ action, request, response, state }) => {
  const { [WS_API]: callAPI } = action;
  const { checkResponse, decorate, normalize, title, type } = callAPI;
  if (!request) {
    request = getRequest(callAPI.request, state); // eslint-disable-line no-param-reassign
  }
  return createSuccess({ type, checkResponse, decorate, normalize, request, response, title });
};

const createFailure = ({ type, error, request, response, title }) => ({
  type: `${type}_ERROR`,
  error: errorToStr(error),
  request,
  response,
  title,
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
  const { title, type } = callAPI;
  if (!request) {
    request = getRequest(callAPI.request, state); // eslint-disable-line no-param-reassign
  }
  return createFailure({ type, error, request, response, title });
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
  const {
    type,
    checkResponse,
    decorate,
    endpoint,
    normalize,
    title,
    useCached,
    dontUseToken
  } = callAPI;
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

  next(createRequest({ type, request }));

  const commonArgs = { type, checkResponse, decorate, normalize, request, title };
  const token = dontUseToken ? undefined : state.auth.token;
  return wsClient.sendRequest(apiCall({ endpoint, request, token })).then(
    response => {
      const { code } = response;
      switch (code) {
        case CODE_OK: {
          return next(createSuccess({ ...commonArgs, response }));
        }
        case CODE_TOKEN_INVALID:
          return next(createAuthTokenExpired({ ...commonArgs, response }));
        default:
          return next(createFailure({ ...commonArgs, response }));
      }
    },
    error => next(createFailure({ ...commonArgs, error, response: { code: 'internal error' } }))
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