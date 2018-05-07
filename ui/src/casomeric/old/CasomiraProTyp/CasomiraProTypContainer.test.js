import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import CasomiraProTypContainer from './CasomiraProTypContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  store = mockStore();
  store.dispatch = jest.fn();
  wrapper = shallow(<CasomiraProTypContainer store={store} typ="maraton" />);
});

it('maps dispatch to props', () => {
  expect(wrapper.props().typ).toEqual('maraton');
  expect(wrapper.props().onAddMezicas).toEqual(expect.any(Function));
});

it('maps onAddMezicas to dispatch addMezicas action', () => {
  const duration = moment.duration('PT4H2M30.1S');
  wrapper.props().onAddMezicas(duration);

  expect(store.dispatch).toHaveBeenCalledWith({
    duration: duration.toJSON(),
    id: 0,
    type: 'ADD_MEZICAS'
  });
});
