import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import PrihlaskyFormContainer from './PrihlaskyFormContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          errorCode: 'Chybový kód.',
          errorMessage: 'Chybová hláška trochu dlouhá.',
          showError: true,
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
  wrapper = shallow(<PrihlaskyFormContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().errorCode).toEqual('Chybový kód.');
  expect(wrapper.props().errorMessage).toEqual('Chybová hláška trochu dlouhá.');
  expect(wrapper.props().showError).toBe(true);
  expect(wrapper.props().saved).toBe(false);
  expect(wrapper.props().saving).toBe(true);
  expect(wrapper.props().existujiciUcastnik).toBe(true);
});

it('maps onHideError to dispatch hideError action', () => {
  wrapper.props().onHideError();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASKY_HIDE_ERROR' });
});

it('maps onHideModal to dispatch hideModal action', () => {
  wrapper.props().onHideModal();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASKY_SAVE_HIDE_MODAL' });
});

it('maps onLoadId to dispatch loadUcastnik action - existující přihláška', () => {
  wrapper = shallow(<PrihlaskyFormContainer loadId="5a09b1fd371dec1e99b7e1c9" store={store} />);

  expect(wrapper.props().onLoadId).toBeTruthy();
  wrapper.props().onLoadId();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'PRIHLASKY_UCASTNIK_LOAD',
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
      datum: '2018-06-09T00:00:00.000Z',
      kategorie: '5a587e1b051c181132cf83d7',
      typ: 'půlmaraton',
      startCislo: 17,
      kod: '10728864'
    },
    platby: [{ castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }],
    ubytovani: { pátek: { prihlaseno: true, prespano: true } }
  });
});

it('maps onLoadId to dispatch ucastnikSelected action - starší účast', () => {
  wrapper = shallow(<PrihlaskyFormContainer loadId="6f09b1fd371dec1e99b7e1c9" store={store} />);

  expect(wrapper.props().onLoadId).toBeTruthy();
  wrapper.props().onLoadId();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'PRIHLASKY_UCASTNIK_LOAD',
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

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASKY_RESET' });
});

it('maps onSubmit to dispatch saveUcast action', () => {
  wrapper.props().onSubmit();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});
