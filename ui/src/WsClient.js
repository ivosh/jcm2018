import WebSocketAsPromised from 'websocket-as-promised';

class WsClient {
  // TODO: port from common
  constructor({ host = 'localhost', port = 4000 } = {}) {
    this.url = `ws://${host}:${port}/`;
    this.reconnectInterval = 2 * 1000;
  }

  connect = async () => {
    const ws = new WebSocketAsPromised(this.url, {
      createWebSocket: url => new WebSocket(this.url, 'jcm2018'),
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
    const ws = this.ws;
    if (ws) {
      return ws.sendRequest(data);
    } else {
      return Promise.reject('Nepřipojeno.');
    }
  };

  close = (code, reason) => {
    this.forcedClose = true;
    const ws = this.ws;
    if (ws) {
      return ws.close(code, reason);
    } else {
      Promise.resolve('Již zavřeno.');
    }
  };

  refresh = () => {
    const ws = this.ws;
    if (ws) {
      return ws.close();
    }
  };
}

export default WsClient;
