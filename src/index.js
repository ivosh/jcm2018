import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import AppConnected from './casomeric/App/AppConnected';
import './index.css';

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
