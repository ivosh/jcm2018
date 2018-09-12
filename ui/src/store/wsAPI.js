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

// For testing. Takes the last action in case array of actions is passed.
// state is required only if request is not supplied and needs to be created using a function.
export const createRequestFromAction = ({ action, request, state }) => {
  const { [WS_API]: wsAPI } = action;
  const callAPI = Array.isArray(wsAPI) ? wsAPI.slice(-1)[0] : wsAPI;
  const { type } = callAPI;
  if (!request) {
    request = getRequest(callAPI.request, state); // eslint-disable-line no-param-reassign
  }
  return createRequest({ type, request });
};

// Called also for client-created failures (SignIn nonce check).
const createSuccess = ({
  type,
  checkResponse,
  decorate = () => {},
  normalize = ({ request, response }) => ({ request, response }),
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

  const { request: normalizedRequest, response: normalizedResponse } = normalize({
    request,
    response
  });

  return {
    type: `${type}_${suffix}`,
    request: normalizedRequest,
    response: { code: response.code, status: response.status, ...normalizedResponse },
    title,
    receivedAt: Date.now(),
    ...decorate(response)
  };
};

// For testing. Takes the last action in case array of actions is passed.
// state is required only if request is not supplied and needs to be created using a function.
export const createSuccessFromAction = ({ action, request, response, state }) => {
  const { [WS_API]: wsAPI } = action;
  const callAPI = Array.isArray(wsAPI) ? wsAPI.slice(-1)[0] : wsAPI;
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
const processArray = async (actions, fn, data) =>
  actions.reduce(async (last, current) => {
    const { code } = await last;
    return code === CODE_OK ? fn({ action: current, ...data }) : { code };
  }, Promise.resolve({ code: CODE_OK }));

const doOneAction = async ({ action, next, store, wsClient }) => {
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
  } = action;
  const request = getRequest(action.request, state);
  if (!endpoint) {
    throw new Error('Specify an API endpoint.');
  }
  if (!type) {
    throw new Error('Specify a redux name for API endpoint.');
  }

  if (useCached && useCached(state)) {
    return { code: CODE_OK };
  }

  next(createRequest({ type, request }));

  const commonArgs = { type, checkResponse, decorate, normalize, request, title };
  const token = dontUseToken ? undefined : state.auth.token;
  try {
    const response = await wsClient.sendRequest(apiCall({ endpoint, request, token }));
    let { code } = response;
    switch (code) {
      case CODE_OK: {
        const createdAction = createSuccess({ ...commonArgs, response });
        next(createdAction);
        ({ code } = createdAction.response);
        break;
      }
      case CODE_TOKEN_INVALID:
        next(createAuthTokenExpired({ ...commonArgs, response }));
        break;
      default:
        next(createFailure({ ...commonArgs, response }));
        break;
    }
    return { code };
  } catch (error) {
    const code = 'internal error';
    next(createFailure({ ...commonArgs, error, response: { code } }));
    return { code };
  }
};

// A Redux middleware that interprets actions with WS_API info specified.
// Performs the call and promises when such actions are dispatched.
// eslint-disable-next-line arrow-body-style
const createWsAPIMiddleware = wsClient => {
  return store => next => async action => {
    const { [WS_API]: callAPI } = action;
    if (!callAPI) {
      next(action);
      return { code: CODE_OK };
    }
    return Array.isArray(callAPI)
      ? processArray(callAPI, doOneAction, { next, store, wsClient })
      : doOneAction({ action: callAPI, next, store, wsClient });
  };
};

const wsAPI = createWsAPIMiddleware();
wsAPI.withExtraArgument = createWsAPIMiddleware;

export default wsAPI;
