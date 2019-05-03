import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BROADCAST_STOPKY, BROADCAST_UCASTNIK } from 'ui-common/common';
import wsAPI from 'ui-common/store/wsAPI';
import appReducer from '../App/appReducer';
import { websocketConnected, websocketDisconnected } from '../App/AppActions';
import { broadcastStopky } from '../entities/stopky/stopkyActions';
import { broadcastUcastnik } from '../entities/ucastnici/ucastniciActions';
import { timesyncOperation, timesyncStart } from '../Timesync/TimesyncActions';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    // :TODO: think about how to report the problem
    // eslint-disable-next-line no-console
    console.log('Problem while loading app state from the local storage', err);
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // :TODO: think about how to report the problem
    // eslint-disable-next-line no-console
    console.log('Problem while storing app state to the local storage', err);
  }
};

const setupWsClient = (wsClient, store) => {
  wsClient.setCallbacks({
    onBroadcast: ({ broadcast, data }) => {
      switch (broadcast) {
        case BROADCAST_UCASTNIK:
          store.dispatch(broadcastUcastnik(data));
          break;
        case BROADCAST_STOPKY:
          store.dispatch(broadcastStopky(data));
          break;
        default:
          break;
      }
    },
    onConnect: async () => {
      await store.dispatch(websocketConnected());
      store.dispatch(timesyncOperation());
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
};

const configureStore = (wsClient, initialStateParam = loadState()) => {
  const initialState = initialStateParam || {};

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    appReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(wsClient), wsAPI.withExtraArgument(wsClient))
    )
  );

  store.subscribe(() => {
    const state = store.getState();
    saveState({
      auth: {
        authenticated: state.auth.authenticated,
        decodedToken: state.auth.decodedToken,
        token: state.auth.token
      }
      // :TODO: casomeric.mezicasy
    });
  });

  // The time synchronization gets started by default.
  store.dispatch(timesyncStart());

  if (wsClient) {
    setupWsClient(wsClient, store);
  }

  return store;
};

export default configureStore;
