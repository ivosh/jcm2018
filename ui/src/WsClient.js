import WebSocketAsPromised from 'websocket-as-promised';
import Channel from 'chnl';

/**
 * Usage:
 * const wsClient = new WsClient({ onConnect, onClose });
 * await wsClient.connect();
 * const response = await wsClient.sendRequest({ your: 'request' });
 * await wsClient.close();
 */
class WsClient {
  // TODO: port from common
  constructor({ host = 'localhost', port = 4000, onConnect, onClose } = {}) {
    this.url = `ws://${host}:${port}/`;
    this.reconnectInterval = 2 * 1000;
    this.sendTimeout = 10 * 1000;
    this.onConnectCallback = onConnect;
    this.onCloseCallback = onClose;
    this.channel = new Channel();
    this.channel.addListener(this.onRequestAvailable);
    this.channel.mute({ accumulate: true });
  }

  connect = async () => {
    const ws = new WebSocketAsPromised(this.url, {
      createWebSocket: () => new WebSocket(this.url, 'jcm2018'),
      packMessage: data => JSON.stringify(data),
      unpackMessage: message => JSON.parse(message),
      attachRequestId: (data, requestId) => ({ ...data, requestId }),
      extractRequestId: data => data && data.requestId,
      timeout: 5000
    });

    try {
      await ws.open();
    } catch (err) {
      this.retryConnect();
      return Promise.resolve('Connect retry scheduled.');
    }

    ws.onClose.addListener(this.handleClose);
    this.ws = ws;
    this.channel.unmute();

    if (this.onConnectCallback) {
      this.onConnectCallback();
    }

    return Promise.resolve('Connected.');
  };

  isConnected = () => {
    const { ws } = this;
    return ws ? ws.isOpened : false;
  };

  retryConnect = () => {
    console.log('WebSocket client connect retry.');
    this.ws = null;
    setTimeout(this.connect, this.reconnectInterval);
  };

  handleClose = () => {
    this.channel.mute({ accumulate: true });

    if (this.onCloseCallback) {
      this.onCloseCallback();
    }

    this.retryConnect();
  };

  onRequestAvailable = async request => {
    const { ws } = this;
    if (ws) {
      const response = await ws.sendRequest(request.data);
      request.resolve(response);
      return;
    }
    // WsClient se mezitím odpojil. Naplánuj znovu.
    this.channel.dispatch(request);
  };

  sendRequest = async data => {
    let request = { data };
    const promise = new Promise((resolve, reject) => {
      request = { ...request, resolve, reject };
    });
    request = { ...request, promise };

    setTimeout(() => request.reject(new Error('Request send timeout.')), this.sendTimeout);
    this.channel.dispatch(request);
    return request.promise;
  };

  close = (code, reason) => {
    const { ws } = this;
    if (ws) {
      return ws.close(code, reason);
    }
    return Promise.resolve('Již zavřeno.');
  };

  refresh = () => {
    const { ws } = this;
    if (ws) {
      return ws.close(); // Triggers ws.onClose listener => this.handleClose().
    }
    return Promise.resolve('Zatím nepřipojeno.');
  };
}

export default WsClient;
