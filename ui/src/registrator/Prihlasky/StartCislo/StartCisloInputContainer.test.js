import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import StartCisloInputContainer from './StartCisloInputContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    registrator: {
      prihlasky: {
        startCislo: {
          showing: false
        }
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <StartCisloInputContainer
      enabled={true}
      inputRef={jest.fn()}
      onChange={jest.fn()}
      store={store}
    />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().enabled).toBe(true);
  expect(wrapper.props().showing).toBe(false);
  expect(wrapper.props().inputRef).toEqual(expect.any(Function));
  expect(wrapper.props().onChange).toEqual(expect.any(Function));
});

it('maps onHide to dispatch hide action', () => {
  wrapper.props().onHide();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASKY_HIDE_START_CISLO' });
});

it('maps onShow to dispatch show action', () => {
  wrapper.props().onShow();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASKY_SHOW_START_CISLO' });
});
