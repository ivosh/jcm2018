import moment from 'moment';
import { addMezicas } from './casomeric/Mezicasy/MezicasyActions';
import configureStore from './configureStore';

it('configure store', () => {
  const store = configureStore(null);
  expect(store).not.toBeNull();
});

it('configure store with preloaded state', () => {
  const preloadedState = { casomeric: { mezicasy: [{ id: 10, duration: 'PT3M25.306S' }] } };
  configureStore(null, preloadedState);
  expect(addMezicas(moment.duration(4365)).id).toEqual(11);
});
