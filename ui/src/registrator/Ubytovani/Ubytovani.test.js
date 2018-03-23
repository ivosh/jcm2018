import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Ubytovani from './Ubytovani';

const mockStore = configureStore();

const state = { registrator: { ubytovani: {} } };
const store = mockStore(state);
store.dispatch = jest.fn();

const commonProps = {
  actionPrefix: 'UBYTOVANI',
  reduxName: 'ubytovani',
  textFilter: '',
  onTextFilterChange: jest.fn()
};

const ubytovani = [
  {
    id: '5a09b1fd371dec1e99b7e1c9',
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    narozeni: { rok: 1956 },
    obec: 'Ostrava 2',
    datum: new Date('2018-06-09T00:00:00.000Z'),
    prihlaseno: true,
    prespano: true
  },
  {
    id: '7a09b1fd371dec1e99b7e142',
    prijmeni: 'Zralá',
    jmeno: 'Hana',
    narozeni: { den: 25, mesic: 7, rok: 1999 },
    obec: 'Bučovice',
    datum: new Date('2018-06-09T00:00:00.000Z'),
    prihlaseno: true
  }
];

it('žádný ubytovaný', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Ubytovani ubytovani={[]} {...commonProps} />
      </MemoryRouter>
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('dva ubytovaní', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Ubytovani ubytovani={ubytovani} {...commonProps} />
      </MemoryRouter>
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
