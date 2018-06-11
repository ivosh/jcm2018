import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import Poradi from './Poradi';

const actionPrefix = 'PORADI';
const kategorieFilters = [
  { active: true, typ: 'maraton', onClick: jest.fn() },
  { typ: 'cyklo', onClick: jest.fn() }
];
const poradi = [
  {
    id: '5a09b1fd371dec1e99b7e1c9',
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    narozeni: { rok: 1956 },
    kategorie: {
      id: '5a587e1b051c181132cf83d7',
      pohlavi: 'muž',
      typ: 'půlmaraton',
      vek: { min: 60, max: 150 },
      zkratka: '4M'
    },
    startCislo: 15,
    dokonceno: false
  },
  {
    id: '7a09b1fd371dec1e99b7e142',
    prijmeni: 'Zralá',
    jmeno: 'Hana',
    narozeni: { den: 25, mesic: 7, rok: 1999 },
    kategorie: {
      id: '5a587e1b051c181132cf83d9',
      typ: 'půlmaraton',
      pohlavi: 'žena',
      vek: { min: 18, max: 39 },
      zkratka: '1Ž'
    },
    startCislo: 11,
    dokonceno: true,
    cas: 'PT2H06M32.6S',
    absPoradi: 1,
    relPoradi: 1
  },
  {
    id: '8344bc71dec1e99b7e1d01e',
    prijmeni: 'Kyselová',
    jmeno: 'Slavěna',
    narozeni: { den: 13, mesic: 8, rok: 2001 },
    kategorie: {
      id: '5a587e1b051c181132cf83d9',
      typ: 'půlmaraton',
      pohlavi: 'žena',
      vek: { min: 18, max: 39 },
      zkratka: '1Ž'
    },
    startCislo: 15,
    dokonceno: undefined
  }
];
const reduxName = 'poradi';

const state = {
  ...ucastniciTestData,
  registrator: {
    poradi: {
      kategorieFilter: '',
      kategorieSubFilter: '',
      textFilter: ''
    }
  }
};

const mockStore = configureStore();
const store = mockStore(state);

it('renders', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Poradi
        actionPrefix={actionPrefix}
        kategorieFilters={kategorieFilters}
        kategorieSubFilters={[]}
        kategorieSubFiltersVisible={false}
        poradi={poradi}
        reduxName={reduxName}
        textFilter=""
        onTextFilterChange={jest.fn()}
      />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
