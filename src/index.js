import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Stopky from './Stopky/Stopky';
import stopkyReducer from './Stopky/stopkyReducer';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(
  stopkyReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Stopky />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
