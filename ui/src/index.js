import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import WsClient from './WsClient';
import configureStore from './configureStore';
import AppContainer from './App/AppContainer';
import { websocketConnected, websocketDisconnected } from './App/AppActions';
import './index.css';

const wsClient = new WsClient();
const store = configureStore(wsClient);

wsClient.setCallbacks({
  onConnect: () => store.dispatch(websocketConnected()),
  onClose: () => store.dispatch(websocketDisconnected())
});

try {
  /* Start asynchronous connect to the websocket server.
     WsClient will retry indefinitely if the connection cannot be established. */
  wsClient.connect();
} catch (err) {
  // Silently ignore any errors. They should have been dispatched from WsClient anyway.
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
