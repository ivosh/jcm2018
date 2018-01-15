import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import PrihlaseniContainer from './PrihlaseniContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    entities: {
      rocniky: {
        roky: [2016, 2017, 2018]
      },
      ucastnici: {
        allIds: ['6f09b1fd371dec1e99b7e1c9', '5a09b1fd371dec1e99b7e1c9'],
        byIds: {
          '6f09b1fd371dec1e99b7e1c9': {
            roky: [2016],
            2016: {
              udaje: {
                prijmeni: 'Sukdoláková',
                jmeno: 'Martina',
                narozeni: { rok: 1963 },
                pohlavi: 'zena',
                obec: 'Zlín',
                stat: 'Česká republika'
              }
            }
          },
          '5a09b1fd371dec1e99b7e1c9': {
            roky: [2018, 2017],
            2018: {
              udaje: {
                prijmeni: 'Balabák',
                jmeno: 'Roman',
                narozeni: { rok: 1956, mesic: 5, den: 15 },
                pohlavi: 'muz',
                obec: 'Ostrava 2',
                stat: 'Česká republika'
              }
            },
            2017: {
              udaje: {
                prijmeni: 'Balabák',
                jmeno: 'Roman',
                narozeni: { rok: 1956 },
                pohlavi: 'muz',
                obec: 'Ostrava 1',
                stat: 'Česká republika'
              }
            }
          }
        }
      }
    },
    registrator: {
      prihlaseni: {
        errorCode: 'Chybový kód.',
        errorMessage: 'Chybová hláška trochu dlouhá.',
        showError: true,
        fetching: false,
        saving: true,
        ucastnikId: '---id---',
        validateEmpty: false
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<PrihlaseniContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().errorCode).toEqual('Chybový kód.');
  expect(wrapper.props().errorMessage).toEqual('Chybová hláška trochu dlouhá.');
  expect(wrapper.props().showError).toBe(true);
  expect(wrapper.props().fetching).toBe(false);
  expect(wrapper.props().saving).toBe(true);
  expect(wrapper.props().existujiciUcastnik).toBe(true);
});

it('maps fetchUcastnici to dispatch', () => {
  wrapper.props().fetchUcastnici();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});

it('maps onHideError to dispatch hideError action', () => {
  wrapper.props().onHideError();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASENI_HIDE_ERROR' });
});

it('maps onReset to dispatch reset action', () => {
  wrapper.props().onReset();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASENI_RESET' });
});

it('maps onSubmit to dispatch saveUcast action', () => {
  wrapper.props().onSubmit();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});
