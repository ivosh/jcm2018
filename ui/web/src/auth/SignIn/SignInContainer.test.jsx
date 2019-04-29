import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { API_SIGN_IN } from 'ui-common/common';
import WsClient from '../../WsClient';
import { WS_API } from '../../store/wsAPI';
import { SIGN_IN } from './SignInActions';
import SignInContainer from './SignInContainer';

const mockStore = configureStore();

const mockWsClient = new WsClient();
mockWsClient.sendRequest = async () => ({});

let store;
let wrapper;
beforeEach(() => {
  const state = { auth: { signIn: { signingIn: false } } };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<SignInContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().signingIn).toBe(false);
});

it('maps onSubmit to dispatch signIn action', async () => {
  await wrapper.props().onSubmit('tumáš', 'jcm');

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: SIGN_IN,
      checkResponse: expect.any(Function),
      dontUseToken: true,
      endpoint: API_SIGN_IN,
      normalize: expect.any(Function),
      request: expect.any(Function),
      title: 'přihlašování'
    }
  });
});
