import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Prihlaseni from './Prihlaseni';

const mockStore = configureStore();

const state = { registrator: { prihlaseni: {} } };
const store = mockStore(state);
store.dispatch = jest.fn();

const commonProps = { actionPrefix: 'PRIHLASENI', reduxName: 'prihlaseni' };

const prihlaseni = [
  {
    id: '5a09b1fd371dec1e99b7e1c9',
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    narozeni: '1956',
    obec: 'Ostrava 2',
    datum: '2018-06-09T00:00:00.000Z',
    kategorie: {
      id: '5a587e1b051c181132cf83d7',
      pohlavi: 'muž',
      typ: 'půlmaraton',
      vek: { min: 60, max: 150 }
    },
    startCislo: 17,
    kod: '10728864',
    zaplaceno: 250,
    predepsano: 200
  },
  {
    id: '7a09b1fd371dec1e99b7e142',
    prijmeni: 'Zralá',
    jmeno: 'Hana',
    narozeni: '25. 7. 1999',
    obec: 'Bučovice',
    datum: '2018-06-09T00:00:00.000Z',
    kategorie: {
      id: '5a587e1b051c181132cf83d9',
      typ: 'půlmaraton',
      pohlavi: 'žena',
      vek: { min: 18, max: 39 }
    },
    startCislo: 10,
    kod: 'abc023skd204mvs345',
    zaplaceno: 100,
    predepsano: 200
  }
];

it('žádný přihlášený', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Prihlaseni prihlaseni={[]} {...commonProps} />
      </MemoryRouter>
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('dva přihlášení', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Prihlaseni prihlaseni={prihlaseni} {...commonProps} />
      </MemoryRouter>
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});