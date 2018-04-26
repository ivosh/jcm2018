import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BROADCAST_STOPKY, BROADCAST_UCASTNIK } from './common';
import appReducer from './App/appReducer';
import { websocketConnected, websocketDisconnected } from './App/AppActions';
import { setHighestMezicasId } from './casomeric/Casomira/Mezicasy/MezicasyActions';
import { broadcastStopky } from './entities/stopky/stopkyActions';
import { broadcastUcastnik } from './entities/ucastnici/ucastniciActions';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Problem while loading app state from the local storage', err);
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
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
};

const configureStore = (wsClient, initialStateParam = loadState()) => {
  const initialState = initialStateParam || {};

  // :TODO: také ostatní kategorie
  if (
    initialState.casomeric &&
    initialState.casomeric.maraton &&
    initialState.casomeric.maraton.mezicasy
  ) {
    let highestId = 0;

    initialState.casomeric.maraton.mezicasy.forEach(mezicas => {
      if (mezicas.id > highestId) {
        highestId = mezicas.id;
      }
    });

    setHighestMezicasId(highestId);
  }

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    appReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(wsClient)))
  );

  store.subscribe(() => {
    const state = store.getState();
    saveState({
      auth: {
        authenticated: state.auth.authenticated,
        decodedToken: state.auth.decodedToken,
        token: state.auth.token
      },
      casomeric: {
        maraton: {
          stopky: state.casomeric.maraton.stopky,
          mezicasy: state.casomeric.maraton.mezicasy
        },
        půlmaraton: {
          stopky: state.casomeric.půlmaraton.stopky,
          mezicasy: state.casomeric.půlmaraton.mezicasy
        },
        cyklo: {
          stopky: state.casomeric.cyklo.stopky,
          mezicasy: state.casomeric.cyklo.mezicasy
        },
        koloběžka: {
          stopky: state.casomeric.koloběžka.stopky,
          mezicasy: state.casomeric.koloběžka.mezicasy
        }
      }
    });
  });

  if (wsClient) {
    setupWsClient(wsClient, store);
  }

  return store;
};

export default configureStore;
