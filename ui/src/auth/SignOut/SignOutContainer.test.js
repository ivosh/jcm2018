import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { API_SIGN_OUT } from '../../common';
import WsClient from '../../WsClient';
import wsAPI, { WS_API } from '../../store/wsAPI';
import { SIGN_OUT } from './SignOutActions';
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

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: SIGN_OUT,
      endpoint: API_SIGN_OUT,
      useCached: expect.any(Function),
      title: 'odhlašování'
    }
  });
});
