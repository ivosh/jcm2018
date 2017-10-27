import { addMezicas } from './Mezicasy/MezicasyActions';
import configureStore from './configureStore';

it('configure store', () => {
  let store = configureStore();
  expect(store).not.toBeNull();
});

it('configure store with preloaded state', () => {
  const preloadedState = { mezicasy: [{ id: 10 }] };
  let store = configureStore(preloadedState);
  expect(addMezicas(null).id).toEqual(11);
});
