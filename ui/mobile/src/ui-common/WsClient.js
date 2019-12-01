import WebSocketAsPromised from 'websocket-as-promised';
import Channel from 'chnl';
import {
  PORT_DEV_CLIENT,
  PORT_DEV_PUPPETEER_CLIENT,
  PORT_DEV_PUPPETEER_SERVER,
  PORT_DEV_SERVER
} from './common';

const WEBSOCKET_RECONNECT_INTERVAL = 2 * 1000; // 2 seconds
const WEBSOCKET_REQUEST_TIMEOUT = 20 * 1000; // 20 seconds

const choosePort = ({ portFromCaller, portFromLocation }) => {
  const ports = {
    [PORT_DEV_CLIENT]: PORT_DEV_SERVER,
    [PORT_DEV_PUPPETEER_CLIENT]: PORT_DEV_PUPPETEER_SERVER
  };

  return portFromCaller || (ports[portFromLocation] || portFromLocation);
};

/**
 * Usage:
 * const wsClient = new WsClient({ onConnect, onClose });
 * await wsClient.connect();
 * const response = await wsClient.sendRequest({ your: 'request' });
 * await wsClient.close();
 */
class WsClient {
  constructor({
    url,
    port: portFromCaller,
    reconnectInterval = WEBSOCKET_RECONNECT_INTERVAL,
    requestTimeout = WEBSOCKET_REQUEST_TIMEOUT,
    onBroadcast,
    onConnect,
    onClose
  } = {}) {
    if (url) {
      this.url = url;
    } else {
      const hostname = (window && window.location && window.location.hostname) || 'localhost';
      const port = parseInt((window && window.location && window.location.port) || '80', 10);
      const wsPort = choosePort({ portFromCaller, portFromLocation: port });
      this.url = hostname === 'localhost' ? `ws://${hostname}:${wsPort}/` : `wss://${hostname}/`;
    }
    this.reconnectInterval = reconnectInterval;
    this.requestTimeout = requestTimeout;
    this.setCallbacks({ onBroadcast, onConnect, onClose });
    this.channel = new Channel();
    this.channel.addListener(this.onRequestAvailable);
    this.channel.mute({ accumulate: true });
  }

  connectPrivate = async request => {
    const ws = new WebSocketAsPromised(this.url, {
      createWebSocket: () => new WebSocket(this.url, 'jcm2020'),
      packMessage: data => JSON.stringify(data),
      unpackMessage: message => JSON.parse(message),
      attachRequestId: (data, requestId) => ({ ...data, requestId }),
      extractRequestId: data => data && data.requestId,
      timeout: this.requestTimeout
    });

    try {
      await ws.open();
    } catch (err) {
      this.retryConnect(request);
      return;
    }

    ws.onClose.addListener(this.handleClose);
    ws.onMessage.addListener(this.handleMessage);
    this.ws = ws;
    this.channel.unmute();

    if (this.onConnectCallback) {
      this.onConnectCallback();
    }

    request.resolve('Connected.');
  };

  connect = () => {
    let request = {};
    const promise = new Promise((resolve, reject) => {
      request = { ...request, resolve, reject };
    });

    this.connectPrivate(request);
    return promise;
  };

  isConnected = () => {
    const { ws } = this;
    return ws ? ws.isOpened : false;
  };

  retryConnect = request => {
    this.ws = null;
    setTimeout(() => this.connectPrivate(request), this.reconnectInterval);
  };

  handleClose = () => {
    this.channel.mute({ accumulate: true });

    if (this.onCloseCallback) {
      this.onCloseCallback();
    }

    const request = { resolve: () => {}, reject: () => {} };
    this.retryConnect(request);
  };

  setCallbacks = ({ onBroadcast, onConnect, onClose }) => {
    this.onBroadcastCallback = onBroadcast;
    this.onConnectCallback = onConnect;
    this.onCloseCallback = onClose;
  };

  handleMessage = message => {
    const { broadcast, data } = JSON.parse(message);
    if (broadcast && this.onBroadcastCallback) {
      this.onBroadcastCallback({ broadcast, data });
    }
  };

  onRequestAvailable = async request => {
    const { ws } = this;
    if (ws) {
      try {
        const response = await ws.sendRequest(request.data);
        request.resolve(response);
      } catch (err) {
        request.reject(err);
      }
      return;
    }
    // WsClient se mezitím odpojil. Naplánuj znovu.
    this.channel.dispatchAsync(request);
  };

  sendRequest = async data => {
    let request = { data };
    const promise = new Promise((resolve, reject) => {
      request = { ...request, resolve, reject };
    });

    this.channel.dispatch(request);
    return promise;
  };

  close = () => {
    const { ws } = this;
    if (ws) {
      this.ws = null;
      return ws.close();
    }
    return Promise.resolve('Již zavřeno.');
  };
}

export default WsClient;
