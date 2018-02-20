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
          validateForm: false
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

it('maps onReset to dispatch reset action', () => {
  wrapper.props().onReset();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASKY_RESET' });
});

it('maps onSubmit to dispatch saveUcast action', () => {
  wrapper.props().onSubmit();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});
