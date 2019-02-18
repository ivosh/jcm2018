import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import PoharyTable from './PoharyTable';

const mockStore = configureStore();

const state = { registrator: { pohary: {} } };
const store = mockStore(state);
store.dispatch = jest.fn();

const commonProps = {
  actionPrefix: 'POHARY',
  narokovaneFilter: false,
  neprevzateFilter: false,
  reduxName: 'pohary',
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
    narozeni: { rok: 1956 },
    pohary: { narok: false, neprevzato: 0, predano: 0 },
    ucasti: { dokoncene: [2017], prihlaseno: false }
  },
  {
    id: '6f09b1fd371dec1e99b7e1c9',
    prijmeni: 'Sukdoláková',
    jmeno: 'Martina',
    narozeni: { rok: 1963, mesic: 12, den: 7 },
    obec: 'Zlín',
    pohary: { narok: false, neprevzato: 1, predano: 0 },
    ucasti: { dokoncene: [2016, 2013, 2012, 2011, 2010], prihlaseno: false }
  },
  {
    id: '7a09b1fd371dec1e99b7e142',
    prijmeni: 'Zralá',
    jmeno: 'Hana',
    narozeni: { den: 25, mesic: 7, rok: 1999 },
    pohary: { narok: false, neprevzato: 0, predano: 0 },
    ucasti: { dokoncene: [], prihlaseno: false }
  }
];

it('žádný pohár', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <PoharyTable pohary={[]} {...commonProps} />
      </MemoryRouter>
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('dva pohároví', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <PoharyTable pohary={pohary} {...commonProps} />
      </MemoryRouter>
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
