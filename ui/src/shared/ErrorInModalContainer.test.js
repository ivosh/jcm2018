import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ErrorInModalContainer from './ErrorInModalContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = { error: { code: 'code', message: 'message', show: false } };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<ErrorInModalContainer title="Error title" store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().code).toEqual('code');
  expect(wrapper.props().message).toEqual('message');
  expect(wrapper.props().show).toBe(false);
  expect(wrapper.props().title).toEqual('Error title');
  expect(wrapper.props()).toEqual(expect.objectContaining({ onHide: expect.any(Function) }));
});

it('maps onHide to dispatch hideError action', async () => {
  wrapper.props().onHide();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'HIDE_ERROR' });
});
