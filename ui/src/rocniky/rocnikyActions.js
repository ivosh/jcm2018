import { CODE_OK, findAllRocniky } from '../common';

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
  data: normalizeRocniky(json),
  receivedAt: Date.now()
});

// TODO: no component is subscribed to this action.
const receiveRocnikyError = ({ code, status, err }) => ({
  type: 'RECEIVE_ROCNIKY_ERROR',
  code,
  status,
  err,
  receivedAt: Date.now()
});

export const fetchRocniky = () => async (dispatch, getState, wsClient) => {
  const state = getState();
  if (state.rocniky && state.rocniky.roky && state.rocniky.roky.length > 0) {
    return; // Use cached value.
  }

  dispatch(requestRocniky());

  try {
    const response = await wsClient.sendRequest(findAllRocniky());
    if (response.code === CODE_OK) {
      dispatch(receiveRocniky(response));
    } else {
      dispatch(receiveRocnikyError(response));
    }
  } catch (err) {
    dispatch(receiveRocnikyError({ code: 'internal error', err }));
  }
};
