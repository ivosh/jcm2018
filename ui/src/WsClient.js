import WebSocketAsPromised from 'websocket-as-promised';

class WsClient {
  // TODO: port from common
  constructor({ host = 'localhost', port = 4000 } = {}) {
    this.url = `ws://${host}:${port}/`;
    this.reconnectInterval = 2 * 1000;
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
      console.log('WebSocket client connected');
    } catch (err) {
      this.handleClose();
    }

    ws.onClose.addListener(this.handleClose);
    this.ws = ws;
  };

  handleClose = () => {
    console.log('WebSocket client connect retry');

    this.ws = null;
    if (this.forcedClose) {
      return;
    }

    setTimeout(this.connect, this.reconnectInterval);
  };

  sendRequest = data => {
    const { ws } = this;
    if (ws) {
      return ws.sendRequest(data);
    }
    return Promise.reject(new Error('Nepřipojeno.'));
  };

  close = (code, reason) => {
    this.forcedClose = true;
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
