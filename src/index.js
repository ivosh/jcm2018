import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import AppConnected from './App/AppConnected';
import appReducer from './App/appReducer';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(
  appReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
