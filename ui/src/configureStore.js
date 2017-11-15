import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './App/appReducer';
import { setHighestMezicasId } from './casomeric/Mezicasy/MezicasyActions';

const demoStartujiciState = {
  startujici: [
    { id: 0, cislo: 7, dokonceno: null },
    { id: 1, cislo: 4, dokonceno: null },
    { id: 10, cislo: 16, dokonceno: null },
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

const configureStore = (wsClient, initialState = loadState()) => {
  if (initialState === undefined) {
    initialState = {};
  }
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

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    appReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(wsClient)))
  );

  store.subscribe(() => {
    const state = store.getState();
    saveState({
      casomeric: { stopky: state.casomeric.stopky, mezicasy: state.casomeric.mezicasy }
    });
  });

  return store;
};

export default configureStore;
