import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import StartovniCislaContainer from './StartovniCislaContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      startovniCisla: {
        odstartovani: false,
      },
    },
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<StartovniCislaContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().odstartovani).toEqual(false);
  expect(wrapper.props().typy).toBeTruthy();
  expect(wrapper.props().typy).toMatchSnapshot();
});

it('maps onOdstartovaniChange to dispatch changeOdstartovani action', () => {
  wrapper.props().onOdstartovaniChange();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'STARTOVNI_CISLA_CHANGE_ODSTARTOVANI' });
});
