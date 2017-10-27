import configureStore from './configureStore';

it('configure store', () => {
  let store = configureStore();
  expect(store).not.toBeNull();
});
