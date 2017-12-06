import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import CasomericContainer from './CasomericContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  store = mockStore();
  store.dispatch = jest.fn();
  wrapper = shallow(<CasomericContainer store={store} />);
});

it('maps dispatch to props', () => {
  expect(wrapper.props()).toEqual(expect.objectContaining({ onAddMezicas: expect.any(Function) }));
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
