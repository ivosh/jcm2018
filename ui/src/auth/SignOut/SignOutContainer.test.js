import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import WsClient from '../../WsClient';
import SignOutContainer from './SignOutContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockWsClient = new WsClient();
mockWsClient.sendRequest = async () => ({});

let store;
let wrapper;
beforeEach(() => {
  const state = {
    auth: {
      authenticated: true,
      token: '===token==='
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<SignOutContainer store={store} />);
});

it('maps ownProps and dispatch to props', () => {
  expect(wrapper.props()).toEqual(expect.objectContaining({ signOut: expect.any(Function) }));
});

it('maps signOut to dispatch signOut action', async () => {
  await wrapper.props().signOut();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});
