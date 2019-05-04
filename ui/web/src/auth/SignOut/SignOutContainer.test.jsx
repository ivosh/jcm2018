import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import WsClient from 'ui-common/WsClient';
import { signOut } from 'ui-common/auth/SignOut/SignOutActions';
import wsAPI from 'ui-common/store/wsAPI';
import SignOutContainer from './SignOutContainer';

const mockWsClient = new WsClient();
mockWsClient.sendRequest = async () => ({});

const middlewares = [wsAPI.withExtraArgument(mockWsClient)];
const mockStore = configureStore(middlewares);

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

  expect(store.dispatch).toHaveBeenCalledWith(signOut());
});
