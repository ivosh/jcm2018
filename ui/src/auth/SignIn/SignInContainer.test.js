import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import WsClient from '../../WsClient';
import SignInContainer from './SignInContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockWsClient = new WsClient();
mockWsClient.sendRequest = async () => ({});

let store;
let wrapper;
beforeEach(() => {
  store = mockStore({});
  store.dispatch = jest.fn();
  wrapper = shallow(<SignInContainer store={store} />);
});

it('maps dispatch to props', () => {
  expect(wrapper.props()).toEqual(expect.objectContaining({ onSubmit: expect.any(Function) }));
});

it('maps onSubmit to dispatch signIn action', async () => {
  await wrapper.props().onSubmit('tumáš', 'jcm');

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});
