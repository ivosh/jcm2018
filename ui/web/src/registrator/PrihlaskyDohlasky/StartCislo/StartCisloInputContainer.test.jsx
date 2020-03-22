import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import StartCisloInputContainer from './StartCisloInputContainer';

const mockStore = configureStore();
const actionPrefix = 'PRIHLASKY_YYY';
const reduxName = 'prihlasky_yyy';

let store;
let wrapper;
beforeEach(() => {
  const state = {
    registrator: {
      [reduxName]: {
        form: {
          ucastnikId: '874647ab4857dc',
          prihlaska: { startCislo: 12, typ: 'maraton' },
        },
        startCislo: {
          showing: false,
        },
      },
    },
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <StartCisloInputContainer
      actionPrefix={actionPrefix}
      enabled={true}
      reduxName={reduxName}
      inputRef={jest.fn()}
      onChange={jest.fn()}
      store={store}
    />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().enabled).toBe(true);
  expect(wrapper.props().showing).toBe(false);
  expect(wrapper.props().typ).toEqual('maraton');
  expect(wrapper.props().vybraneId).toEqual('874647ab4857dc');
  expect(wrapper.props().vybraneStartCislo).toEqual(12);
  expect(wrapper.props().inputRef).toEqual(expect.any(Function));
  expect(wrapper.props().onChange).toEqual(expect.any(Function));
});

it('maps onHide to dispatch hide action', () => {
  wrapper.props().onHide();

  expect(store.dispatch).toHaveBeenCalledWith({ type: `${actionPrefix}_HIDE_START_CISLO` });
});

it('maps onSelect to dispatch hide and inputChanged actions', () => {
  wrapper.props().onSelect(12);

  expect(store.dispatch).toHaveBeenCalledTimes(2);
  expect(store.dispatch).toHaveBeenCalledWith({ type: `${actionPrefix}_HIDE_START_CISLO` });
  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_INPUT_CHANGED`,
    name: 'prihlaska.startCislo',
    value: '12',
    chooseKategorie: expect.any(Function),
  });
});

it('maps onShow to dispatch show action', () => {
  wrapper.props().onShow();

  expect(store.dispatch).toHaveBeenCalledWith({ type: `${actionPrefix}_SHOW_START_CISLO` });
});
