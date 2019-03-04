import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { ActionPrefixes, ReduxNames } from '../../constants';
import PoharyTable from './PoharyTable';

const actionPrefix = ActionPrefixes.POHARY_PO_STARTU;
const mockStore = configureStore();
const reduxName = ReduxNames.poharyPoStartu;

const state = { registrator: { [reduxName]: {} } };
const store = mockStore(state);
store.dispatch = jest.fn();

const commonProps = {
  actionPrefix,
  narokovaneFilter: false,
  neprevzateFilter: false,
  popisek: 'se na něj přihlásili',
  reduxName,
  textFilter: '',
  canDrop: jest.fn(),
  onDrop: jest.fn(),
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
    pohary: { narok: true, neprevzato: 0, predano: 0 },
    ucasti: { dokoncene: [2017, 2015, 2014, 2013], prihlaseno: true, odstartovano: false }
  },
  {
    id: '6f09b1fd371dec1e99b7e1c9',
    prijmeni: 'Sukdoláková',
    jmeno: 'Martina',
    narozeni: { rok: 1963, mesic: 12, den: 7 },
    obec: 'Zlín',
    pohary: { narok: false, neprevzato: 1, predano: 0 },
    ucasti: { dokoncene: [2016, 2013, 2012, 2011, 2010], prihlaseno: false, odstartovano: false }
  },
  {
    id: '7a09b1fd371dec1e99b7e142',
    prijmeni: 'Zralá',
    jmeno: 'Hana',
    narozeni: { den: 25, mesic: 7, rok: 1999 },
    pohary: { narok: false, neprevzato: 0, predano: 0 },
    ucasti: { dokoncene: [], prihlaseno: false, odstartovano: false }
  }
];

it('žádný pohár', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter keyLength={0}>
        <PoharyTable pohary={[]} {...commonProps} />
      </MemoryRouter>
    </Provider>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('dva pohároví', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter keyLength={0}>
        <PoharyTable pohary={pohary} {...commonProps} />
      </MemoryRouter>
    </Provider>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
