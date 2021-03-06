import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import PlatbyContainer from './PlatbyContainer';

const mockStore = configureStore();
const actionPrefix = 'PRIHLASKY_YYY';
const reduxName = 'prihlasky_yyy';

const state = {
  ...ucastniciTestData,
  registrator: {
    [reduxName]: {
      form: {
        jePrihlaskou: false,
        validatePlatba: false,
        prihlaska: { datum: '2020-05-01T00:00:00.000Z', typ: 'cyklo' },
        platby: [
          {
            castka: 250,
            datum: '2020-05-01T00:00:00.000Z',
            typ: 'převodem',
            poznamka: 'stále visí',
          },
          { castka: 20, datum: '2020-06-06T00:00:00.000Z', typ: 'hotově' },
        ],
      },
      platby: {
        castka: 150,
        datum: 'rozepsáno',
        typ: 'složenkou',
        poznamka: undefined,
        novaPlatbaMinified: true,
      },
    },
  },
};

let store;
let wrapper;
beforeEach(() => {
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <PlatbyContainer
      startIndex={10}
      store={store}
      actionPrefix={actionPrefix}
      reduxName={reduxName}
      inputRef={jest.fn()}
    />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().actionPrefix).toEqual(actionPrefix);
  expect(wrapper.props().novaPlatbaMinified).toBe(true);
  expect(wrapper.props().predepsano).toMatchSnapshot();
  expect(wrapper.props().provedeno).toMatchSnapshot();
  expect(wrapper.props().reduxName).toEqual(reduxName);
});

it('nastav novaPlatbaMinified pokud provedeno < předepsáno', () => {
  const state2 = JSON.parse(JSON.stringify(state)); // deep copy
  state2.registrator[reduxName].form.platby = state2.registrator[reduxName].form.platby.slice(0, 1);
  store = mockStore(state2);
  wrapper = shallow(
    <PlatbyContainer
      actionPrefix={actionPrefix}
      reduxName={reduxName}
      startIndex={10}
      store={store}
      inputRef={jest.fn()}
    />
  );

  expect(wrapper.props().novaPlatbaMinified).toBe(false);
  expect(wrapper.props().predepsano).toMatchSnapshot();
  expect(wrapper.props().provedeno).toMatchSnapshot();
});

it('maps onAdd to dispatch addValidatedPlatba', () => {
  wrapper.props().onAdd();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});

it('maps onExpand to dispatch expandNovaPlatba', () => {
  wrapper.props().onExpand();

  expect(store.dispatch).toHaveBeenCalledWith({ type: `${actionPrefix}_NOVA_PLATBA_EXPAND` });
});

it('maps provedeno.platby[0].onRemove to dispatch removePlatba action', () => {
  wrapper.props().provedeno.platby[0].onRemove();

  expect(store.dispatch).toHaveBeenCalledWith({ type: `${actionPrefix}_REMOVE_PLATBA`, idx: 0 });
});

it('prihlasky - předepsané startovné předem', () => {
  const state2 = JSON.parse(JSON.stringify(state)); // deep copy
  state2.registrator.prihlasky = state2.registrator[reduxName];
  state2.registrator.prihlasky.form.jePrihlaskou = true;
  state2.registrator.prihlasky.form.platby = [];
  store = mockStore(state2);
  wrapper = shallow(
    <PlatbyContainer
      actionPrefix={actionPrefix}
      reduxName="prihlasky"
      startIndex={10}
      store={store}
      inputRef={jest.fn()}
    />
  );

  expect(wrapper.props().predepsano).toMatchSnapshot();
  expect(wrapper.props().provedeno).toMatchSnapshot();
});
