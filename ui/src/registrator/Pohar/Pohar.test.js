import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Pohar from './Pohar';

const mockStore = configureStore();

const state = { registrator: { pohar: {} } };
const store = mockStore(state);
store.dispatch = jest.fn();

const commonProps = {
  actionPrefix: 'POHAR',
  narokovaneFilter: false,
  neprevzateFilter: false,
  reduxName: 'pohar',
  textFilter: '',
  onNarokovaneFilterChange: jest.fn(),
  onNeprevzateFilterChange: jest.fn(),
  onTextFilterChange: jest.fn()
};

const pohary = [
  {
    id: '5a09b1fd371dec1e99b7e1c9',
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    narozeni: { rok: 1956 }
  },
  {
    id: '6f09b1fd371dec1e99b7e1c9',
    prijmeni: 'Sukdoláková',
    jmeno: 'Martina',
    narozeni: { rok: 1963, mesic: 12, den: 7 },
    obec: 'Zlín'
  },
  {
    id: '7a09b1fd371dec1e99b7e142',
    prijmeni: 'Zralá',
    jmeno: 'Hana',
    narozeni: { den: 25, mesic: 7, rok: 1999 }
  }
];

it('žádný pohár', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Pohar pohary={[]} {...commonProps} />
      </MemoryRouter>
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('dva pohároví', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Pohar pohary={pohary} {...commonProps} />
      </MemoryRouter>
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
