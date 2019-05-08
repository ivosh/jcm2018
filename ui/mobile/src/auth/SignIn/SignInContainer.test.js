import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { API_SIGN_IN } from '../../ui-common/common';
import WsClient from '../../ui-common/WsClient';
import { SIGN_IN } from '../../ui-common/auth/SignIn/SignInActions';
import { WS_API } from '../../ui-common/store/wsAPI';
import SignInContainer from './SignInContainer';
import SignIn from './SignIn';

const mockStore = configureStore();

const mockWsClient = new WsClient();
mockWsClient.sendRequest = async () => ({});

let store;
let component;
beforeEach(() => {
  const state = { auth: { signIn: { signingIn: false } } };
  store = mockStore(state);
  store.dispatch = jest.fn();
  const container = renderer.create(<SignInContainer store={store} />);
  component = container.root.findByType(SignIn);
  expect(component).toBeTruthy();
});

it('maps state and dispatch to props', () => {
  expect(component.props.signingIn).toBe(false);
});

it('maps onSubmit to dispatch signIn action', async () => {
  await component.props.onSubmit('tumáš', 'jcm');

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
