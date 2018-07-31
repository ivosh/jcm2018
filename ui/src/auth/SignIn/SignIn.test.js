import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SignIn from './SignIn';

const mockStore = configureStore();

it('prázdný formulář', () => {
  const wrapper = shallow(<SignIn signingIn={false} onSubmit={jest.fn()} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('formulář při načítání', () => {
  const wrapper = shallow(<SignIn signingIn={true} onSubmit={jest.fn()} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('formulář s chybou', () => {
  const state = { error: { code: 'code', message: 'message', show: true } };
  const store = mockStore(state);

  const wrapper = mount(
    <Provider store={store}>
      <SignIn signingIn={false} onSubmit={jest.fn()} />
    </Provider>
  );
  expect(wrapper.find('Alert')).toHaveLength(1);
});

it('handle succesfull form submit', () => {
  const onSubmit = jest.fn();
  const state = { error: { code: 'code', message: 'message', show: true } };
  const store = mockStore(state);

  const wrapper = mount(
    <Provider store={store}>
      <SignIn signingIn={false} onSubmit={onSubmit} />
    </Provider>
  );
  expect(wrapper.find('#username')).toHaveLength(1);
  expect(wrapper.find('#password')).toHaveLength(1);
  expect(wrapper.find('form')).toHaveLength(1);

  wrapper.find('#username').simulate('change', { target: { value: 'tumáš' } });
  wrapper.find('#password').simulate('change', { target: { value: 'jcm' } });
  wrapper.find('form').simulate('submit');
  expect(onSubmit).toHaveBeenCalledWith('tumáš', 'jcm');
});
