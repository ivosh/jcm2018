import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SignIn from './SignIn';

it('prázdný formulář', () => {
  const component = renderer.create(<SignIn signingIn={false} onSubmit={jest.fn()} />);
  expect(component.toJSON).toMatchSnapshot();
});

it('formulář při načítání', () => {
  const component = renderer.create(<SignIn signingIn={true} onSubmit={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('handle succesfull form submit', () => {
  const onSubmit = jest.fn();

  const wrapper = mount(<SignIn signingIn={false} onSubmit={onSubmit} />);
  expect(wrapper.find('#username')).toHaveLength(1);
  expect(wrapper.find('#password')).toHaveLength(1);
  expect(wrapper.find('form')).toHaveLength(1);

  wrapper.find('#username').simulate('change', { target: { value: 'tumáš' } });
  wrapper.find('#password').simulate('change', { target: { value: 'jcm' } });
  wrapper.find('form').simulate('submit');
  expect(onSubmit).toHaveBeenCalledWith('tumáš', 'jcm');
});
