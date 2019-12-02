import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData, {
  AKTUALNI_DATUM_KONANI
} from '../../../entities/ucastnici/ucastniciTestData';
import PrihlaskyFormContainer from './PrihlaskyFormContainer';

const mockStore = configureStore();
const actionPrefix = 'PRIHLASKY_YYY';
const reduxName = 'prihlasky_yyy';

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        form: {
          saved: false,
          saving: true,
          ucastnikId: '---id---',
          validate: false
        }
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <PrihlaskyFormContainer actionPrefix={actionPrefix} reduxName={reduxName} store={store} />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().actionPrefix).toEqual(actionPrefix);
  expect(wrapper.props().reduxName).toEqual(reduxName);
  expect(wrapper.props().saved).toBe(false);
  expect(wrapper.props().saving).toBe(true);
  expect(wrapper.props().existujiciUcastnik).toBe(true);
});

it('maps onHideModal to dispatch hideModal action', () => {
  wrapper.props().onHideModal();

  expect(store.dispatch).toHaveBeenCalledWith({ type: `${actionPrefix}_SAVE_HIDE_MODAL` });
});

it('maps onLoadId to dispatch loadUcastnik action - existující přihláška', () => {
  wrapper = shallow(
    <PrihlaskyFormContainer
      actionPrefix={actionPrefix}
      loadId="5a09b1fd371dec1e99b7e1c9"
      reduxName={reduxName}
      store={store}
    />
  );

  expect(wrapper.props().onLoadId).toBeTruthy();
  wrapper.props().onLoadId();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_UCASTNIK_LOAD`,
    datumKonani: AKTUALNI_DATUM_KONANI,
    id: '5a09b1fd371dec1e99b7e1c9',
    udaje: {
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      obec: 'Ostrava 2',
      pohlavi: 'muž',
      prijmeni: 'Balabák',
      stat: 'Česká republika'
    },
    prihlaska: {
      datum: AKTUALNI_DATUM_KONANI,
      kategorie: '5a587e1b051c181132cf83d7',
      typ: 'půlmaraton',
      startCislo: 17,
      kod: '10728864'
    },
    platby: [{ castka: 350, datum: AKTUALNI_DATUM_KONANI, typ: 'hotově' }],
    ubytovani: { pátek: { prihlaseno: true, prespano: true } }
  });
});

it('maps onLoadId to dispatch ucastnikSelected action - starší účast', () => {
  wrapper = shallow(
    <PrihlaskyFormContainer
      actionPrefix={actionPrefix}
      loadId="6f09b1fd371dec1e99b7e1c9"
      reduxName={reduxName}
      store={store}
    />
  );

  expect(wrapper.props().onLoadId).toBeTruthy();
  wrapper.props().onLoadId();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_UCASTNIK_LOAD`,
    datumKonani: AKTUALNI_DATUM_KONANI,
    id: '6f09b1fd371dec1e99b7e1c9',
    udaje: {
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { rok: 1963, mesic: 12, den: 7 },
      pohlavi: 'žena',
      obec: 'Zlín',
      stat: 'Česká republika'
    }
  });
});

it('maps onReset to dispatch reset action', () => {
  wrapper.props().onReset();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_RESET`,
    datumKonani: AKTUALNI_DATUM_KONANI
  });
});

it('maps onSubmit to dispatch saveUcast action', () => {
  wrapper.props().onSubmit();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});
