import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import WsClient from './WsClient';
import configureStore from './configureStore';
import AppContainer from './App/AppContainer';
import { websocketConnected, websocketDisconnected } from './App/AppActions';
import './index.css';

const setupStoreAndWsClient = () => {
  const wsClient = new WsClient();
  const store = configureStore(wsClient);

  wsClient.setCallbacks({
    onConnect: () => {
      store.dispatch(websocketConnected());
      // store.dispatch(fetchRocniky());
    },
    onClose: () => store.dispatch(websocketDisconnected())
  });

  try {
    /* Start asynchronous connect to the websocket server.
     WsClient will retry indefinitely if the connection cannot be established. */
    wsClient.connect();
  } catch (err) {
    // Silently ignore any errors. They should have been dispatched from WsClient anyway.
  }

  return store;
};

export const renderApp = store => {
  /* Render a pathless <Route> so that 'location' is automatically injected as a 'prop'
   into AppContainer and causes re-render on location change. See:
   https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
 */
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Route component={AppContainer} />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
};

const store = setupStoreAndWsClient();
renderApp(store);
registerServiceWorker();
