import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import WsClient from './WsClient';
import configureStore from './configureStore';
import App from './App/App';
import './index.css';

const wsClient = new WsClient();
const store = configureStore(wsClient);

try {
  wsClient.connect();
} catch (err) {}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
