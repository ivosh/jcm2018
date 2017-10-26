import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import registerServiceWorker from './registerServiceWorker';
import AppConnected from './App/AppConnected';
import appReducer from './App/appReducer';
import './index.css';

const preloadedState = {
  startujici: [
    { id: 0, cislo: 7, dokonceno: null },
    { id: 1, cislo: 4, dokonceno: null },
    { id: 10, cislo: 16, dokonceno: true, duration: moment.duration('PT0H4M32.45S') },
    { id: 2, cislo: 25, dokonceno: false },
    { id: 3, cislo: 9, dokonceno: true, duration: moment.duration('PT0H17M29.14S') },
    { id: 12, cislo: 15, dokonceno: true, duration: moment.duration('PT0H9M59.01S') },
    { id: 9, cislo: 1, dokonceno: false },
    { id: 29, cislo: 8, dokonceno: null },
    { id: 5, cislo: 59, dokonceno: null },
    { id: 11, cislo: 43, dokonceno: null },
    { id: 18, cislo: 42, dokonceno: false },
    { id: 10, cislo: 33, dokonceno: true, duration: moment.duration('PT0H3M22.45S') },
    { id: 7, cislo: 21, dokonceno: false },
    { id: 13, cislo: 24, dokonceno: true, duration: moment.duration('PT0H3M14.15S') },
    { id: 34, cislo: 25, dokonceno: null },
    { id: 14, cislo: 22, dokonceno: null },
    { id: 58, cislo: 30, dokonceno: null },
    { id: 15, cislo: 23, dokonceno: true, duration: moment.duration('PT0H2M42.38S') },
    { id: 59, cislo: 26, dokonceno: null }
  ]
};

let store = createStore(
  appReducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
