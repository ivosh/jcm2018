import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import StartujiciContainer from './StartujiciContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = { ...ucastniciTestData };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<StartujiciContainer store={store} />);
});

it('maps state to props', () => {
  expect(wrapper.props().prihlaseni).toBeTruthy();
  expect(wrapper.props().prihlaseni).toMatchSnapshot();
  expect(wrapper.props().odstartovani).toBeTruthy();
  expect(wrapper.props().odstartovani).toMatchSnapshot();
});

it('maps movePrihlasen to dispatch createVykon', () => {
  wrapper.props().movePrihlasen({ id: '8344bc71dec1e99b7e1d01e' });

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});

it('maps moveOdstartovan to dispatch deleteVykon', () => {
  wrapper.props().moveOdstartovan({ id: '8344bc71dec1e99b7e1d01e' });

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});
