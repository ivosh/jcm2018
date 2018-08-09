import React from 'react';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SignIn from './SignIn';

it('prázdný formulář', () => {
  const wrapper = shallow(<SignIn signingIn={false} onSubmit={jest.fn()} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('formulář při načítání', () => {
  const wrapper = shallow(<SignIn signingIn={true} onSubmit={jest.fn()} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
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
