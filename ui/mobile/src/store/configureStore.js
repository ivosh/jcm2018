import AsyncStorage from 'react-native'; // :TODO: use @react-native-community/async-storage
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import wsAPI from '../ui-common/store/wsAPI';
import { websocketConnected, websocketDisconnected } from '../ui-common/App/connectedActions';
import appReducer from '../App/appReducer';

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('state');
    if (serializedState === null || serializedState === undefined) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    // :TODO: think about how to report the problem
    // eslint-disable-next-line no-console
    console.log('Problem while loading app state from the async storage', err);
    return undefined;
  }
};

const saveState = async state => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('state', serializedState);
  } catch (err) {
    // :TODO: think about how to report the problem
    // eslint-disable-next-line no-console
    console.log('Problem while storing app state to the async storage', err);
  }
};

const setupWsClient = (wsClient, store) => {
  wsClient.setCallbacks({
    onBroadcast: ({ broadcast }) => {
      switch (broadcast) {
        /* :TODO:
        case BROADCAST_UCASTNIK:
          store.dispatch(broadcastUcastnik(data));
          break;
        case BROADCAST_STOPKY:
          store.dispatch(broadcastStopky(data));
          break;
        */
        default:
          break;
      }
    },
    onConnect: async () => {
      await store.dispatch(websocketConnected());
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

const configureStore = (wsClient, initialStateParam) => {
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

  store.subscribe(async () => {
    const state = store.getState();
    await saveState({
      auth: {
        authenticated: state.auth.authenticated,
        decodedToken: state.auth.decodedToken,
        token: state.auth.token
      },
      serviceURL: state.serviceURL
    });
  });

  if (wsClient) {
    setupWsClient(wsClient, store);
  }

  return store;
};

export default configureStore;
