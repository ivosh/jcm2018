const requestUcastnici = () => ({
  type: 'REQUEST_UCASTNICI'
});

const normalizeUcastnik = json => {
  const roky = [];
  const ucasti = {};

  json.ucasti.forEach(ucast => {
    const { rok, ...ucastBezRoku } = ucast;
    roky.push(rok);
    ucasti[rok] = ucastBezRoku;
  });

  // První element je vždycky nejvyšší rok.
  roky.sort((a, b) => b - a);

  return { roky, ucasti };
};

const normalizeUcastnici = json => {
  const allIds = [];
  const byIds = {};

  json.response.forEach(ucastnik => {
    allIds.push(ucastnik.id);

    const { roky, ucasti } = normalizeUcastnik(ucastnik);
    byIds[ucastnik.id] = { roky, ...ucasti };
  });

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
