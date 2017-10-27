import { createStore } from 'redux';
import appReducer from './App/appReducer';
import { setHighestMezicasId } from './Mezicasy/MezicasyActions';

const preloadedState = {
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
    { id: 34, cislo: 25, dokonceno: null },
    { id: 14, cislo: 22, dokonceno: null },
    { id: 58, cislo: 30, dokonceno: null },
    { id: 15, cislo: 23, dokonceno: null },
    { id: 59, cislo: 26, dokonceno: null }
  ]
};

const configureStore = () => {
  let highestId = 0;
  if (preloadedState.mezicasy) {
    preloadedState.mezicasy.forEach(mezicas => {
      if (mezicas.id > highestId) {
        highestId = mezicas.id;
      }
    });
  }

  setHighestMezicasId(highestId);

  return createStore(
    appReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default configureStore;
