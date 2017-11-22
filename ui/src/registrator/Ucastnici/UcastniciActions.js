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
    const response = await wsClient.sendRequest({ action: 'find_all_ucastnici' }); // TODO: from common.findAllUcastnici
    dispatch(receiveUcastnici(response));
  } catch (err) {
    console.log(`Chyba u wsClienta: ${err}`);
    // TODO: dispatch error somehow
  }
};
