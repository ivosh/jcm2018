export const WEBSOCKET_CONNECTED = 'WEBSOCKET_CONNECTED';
export const WEBSOCKET_DISCONNECTED = 'WEBSOCKET_DISCONNECTED';

export const websocketConnected = () => ({ type: WEBSOCKET_CONNECTED });
export const websocketDisconnected = () => ({ type: WEBSOCKET_DISCONNECTED });
