import { WEBSOCKET_CONNECTED, WEBSOCKET_DISCONNECTED } from './connectedActions';

const connectedReducer = (state = false, action) => {
  switch (action.type) {
    case WEBSOCKET_CONNECTED:
      return true;
    case WEBSOCKET_DISCONNECTED:
      return false;
    default:
      return state;
  }
};

export default connectedReducer;
