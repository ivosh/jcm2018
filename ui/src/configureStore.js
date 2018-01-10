import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './App/appReducer';
import { websocketConnected, websocketDisconnected } from './App/AppActions';
import { setHighestMezicasId } from './casomeric/Mezicasy/MezicasyActions';

const demoStartujiciState = {
  startujici: [
    { id: 0, cislo: 7, dokonceno: null },
    { id: 1, cislo: 4, dokonceno: null },
    { id: 17, cislo: 16, dokonceno: null },
    { id: 2, cislo: 25, dokonceno: false },
    { id: 3, cislo: 9, dokonceno: null },
    { id: 12, cislo: 15, dokonceno: null },
    { id: 9, cislo: 1, dokonceno: false },
    { id: 29, cislo: 8, dokonceno: null },
    { id: 5, cislo: 59, dokonceno: null },
    { id: 11, cislo: 43, dokonceno: null },
    { id: 18, cislo: 42, dokonceno: false },
    { id: 10, cislo: 33, dokonceno: null },
    { id: 7, cislo: 21, dokonceno: false },
    { id: 13, cislo: 24, dokonceno: null },
    { id: 34, cislo: 27, dokonceno: null },
    { id: 14, cislo: 22, dokonceno: null },
    { id: 58, cislo: 30, dokonceno: null },
    { id: 15, cislo: 23, dokonceno: null },
    { id: 59, cislo: 26, dokonceno: null }
  ]
};

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
    onConnect: () => {
      store.dispatch(websocketConnected());
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
  initialState.startujici = demoStartujiciState.startujici;

  if (initialState.casomeric && initialState.casomeric.mezicasy) {
    let highestId = 0;

    initialState.casomeric.mezicasy.forEach(mezicas => {
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
      casomeric: { stopky: state.casomeric.stopky, mezicasy: state.casomeric.mezicasy }
    });
  });

  if (wsClient) {
    setupWsClient(wsClient, store);
  }

  return store;
};

export default configureStore;
