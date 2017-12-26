import { CODE_OK, findAllUcastnici } from '../common';

const requestUcastnici = () => ({
  type: 'REQUEST_UCASTNICI'
});

const normalizeUcastnici = json => {
  const byIds = json.response;
  const allIds = Object.keys(byIds);

  return { allIds, byIds };
};

export const receiveUcastnici = json => ({
  type: 'RECEIVE_UCASTNICI',
  ucastnici: normalizeUcastnici(json),
  receivedAt: Date.now()
});

export const fetchUcastnici = () => async (dispatch, getState, wsClient) => {
  dispatch(requestUcastnici());

  try {
    const response = await wsClient.sendRequest(findAllUcastnici());
    if (response.code === CODE_OK) {
      dispatch(receiveUcastnici(response));
    } else {
      console.log(`Chyba u wsClienta: ${response.code} ${response.status}`);
      // TODO: dispatch error somehow
    }
  } catch (err) {
    console.log(`Chyba u wsClienta: ${err}`);
    // TODO: dispatch error somehow
  }
};
