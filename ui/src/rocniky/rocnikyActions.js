import { findAllRocniky } from '../common';

const requestRocniky = () => ({
  type: 'REQUEST_ROCNIKY'
});

const normalizeRocniky = json => {
  const rocniky = json.response;
  const roky = Object.keys(rocniky).map(value => parseInt(value, 10));

  return { rocniky, roky };
};

export const receiveRocniky = json => ({
  type: 'RECEIVE_ROCNIKY',
  rocniky: normalizeRocniky(json),
  receivedAt: Date.now()
});

export const fetchRocniky = () => async (dispatch, getState, wsClient) => {
  dispatch(requestRocniky());

  try {
    const response = await wsClient.sendRequest(findAllRocniky());
    dispatch(receiveRocniky(response));
  } catch (err) {
    console.log(`Chyba u wsClienta: ${err}`);
    // TODO: dispatch error somehow
  }
};
