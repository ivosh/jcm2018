import WebSocketAsPromised from 'websocket-as-promised';

class WsClient {
  // TODO: port from common
  constructor({ host = 'localhost', port = 4000, onConnect, onClose } = {}) {
    this.url = `ws://${host}:${port}/`;
    this.reconnectInterval = 2 * 1000;
    this.onConnectCallback = onConnect;
    this.onCloseCallback = onClose;
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
      if (this.onConnectCallback) {
        this.onConnectCallback();
      }
    } catch (err) {
      this.retryConnect();
    }

    ws.onClose.addListener(this.handleClose);
    this.ws = ws;
  };

  isConnected = () => {
    const { ws } = this;
    return ws ? ws.isOpened : false;
  };

  retryConnect = () => {
    console.log('WebSocket client connect retry');
    this.ws = null;
    setTimeout(this.connect, this.reconnectInterval);
  };

  handleClose = () => {
    this.ws = null;

    if (this.onCloseCallback) {
      this.onCloseCallback();
    }

    this.retryConnect();
  };

  sendRequest = data => {
    const { ws } = this;
    if (ws) {
      return ws.sendRequest(data);
    }
    return Promise.reject(new Error('Nepřipojeno.'));
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
      return ws.close();
    }
    return Promise.resolve();
  };
}

export default WsClient;
