import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import UcastniciDigest from './UcastniciDigest';

const mockStore = configureStore();

const state = { registrator: { ucastniciDigest: {} } };
const store = mockStore(state);
store.dispatch = jest.fn();

const commonProps = {
  actionPrefix: 'UCASTNICI_DIGEST',
  reduxName: 'ucastniciDigest',
  fetchUcastnici: jest.fn()
};

const roky = [
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018
];

const ucastniciDigest = [
  {
    id: '5a09b1fd371dec1e99b7e1c9',
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    narozeni: '1956',
    2016: { dokonceno: false },
    2017: { dokonceno: true, kategorie: 'maraton' },
    2018: { dokonceno: true, kategorie: 'půlmaraton' }
  },
  {
    id: '6f09b1fd371dec1e99b7e1c9',
    prijmeni: 'Sukdoláková',
    jmeno: 'Martina',
    narozeni: '7. 12. 1963',
    2015: { dokonceno: false },
    2017: { dokonceno: true, kategorie: 'maraton' },
    2018: { dokonceno: undefined, kategorie: 'půlmaraton' }
  }
];

it('žádný účastník', () => {
  const component = renderer.create(
    <Provider store={store}>
      <UcastniciDigest roky={roky} ucastniciDigest={[]} fetching={false} {...commonProps} />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('načítá se', () => {
  const component = renderer.create(
    <Provider store={store}>
      <UcastniciDigest
        roky={roky}
        ucastniciDigest={ucastniciDigest}
        fetching={true}
        {...commonProps}
      />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('dva účastníci', () => {
  const component = renderer.create(
    <Provider store={store}>
      <UcastniciDigest roky={roky} ucastniciDigest={ucastniciDigest} {...commonProps} />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
