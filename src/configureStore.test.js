import moment from 'moment';
import { addMezicas } from './casomeric/Mezicasy/MezicasyActions';
import configureStore from './configureStore';

it('configure store', () => {
  let store = configureStore();
  expect(store).not.toBeNull();
});

it('configure store with preloaded state', () => {
  const preloadedState = { mezicasy: [{ id: 10, duration: 'PT3M25.306S' }] };
  let store = configureStore(preloadedState);
  expect(addMezicas(moment.duration(4365)).id).toEqual(11);
});
