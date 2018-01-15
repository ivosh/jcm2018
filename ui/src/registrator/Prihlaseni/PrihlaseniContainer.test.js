import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import PrihlaseniContainer from './PrihlaseniContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
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
