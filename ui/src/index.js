import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-virtualized/styles.css';
import registerServiceWorker from './registerServiceWorker';
import WsClient from './WsClient';
import AppContainer from './App/AppContainer';
import configureStore from './store/configureStore';
import './index.css';

const store = configureStore(new WsClient());

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

registerServiceWorker();
