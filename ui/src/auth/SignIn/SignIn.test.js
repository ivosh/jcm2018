import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SignIn from './SignIn';

it('prázdný formulář', () => {
  const component = renderer.create(
    <SignIn isSigningIn={false} onHideError={jest.fn()} onSubmit={jest.fn()} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('formulář s chybou', () => {
  const component = renderer.create(
    <SignIn
      isSigningIn={false}
      errorCode="kód"
      errorMessage="Chybová zpráva"
      showError={true}
      onHideError={jest.fn()}
      onSubmit={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('handle succesfull form submit', () => {
  const onSubmit = jest.fn();

  const wrapper = mount(<SignIn isSigningIn={false} onHideError={jest.fn()} onSubmit={onSubmit} />);
  expect(wrapper.find('#username')).toHaveLength(1);
  expect(wrapper.find('#password')).toHaveLength(1);
  expect(wrapper.find('form')).toHaveLength(1);

  wrapper.find('#username').simulate('change', { target: { value: 'tumáš' } });
  wrapper.find('#password').simulate('change', { target: { value: 'jcm' } });
  wrapper.find('form').simulate('submit');
  expect(onSubmit).toHaveBeenCalledWith('tumáš', 'jcm');
});

it('handle hide error', () => {
  const onHideError = jest.fn();

  const wrapper = mount(
    <SignIn isSigningIn={false} showError={true} onHideError={onHideError} onSubmit={jest.fn()} />
  );
  expect(wrapper.find('button.close')).toHaveLength(1);

  wrapper.find('button.close').simulate('click');
  expect(onHideError).toHaveBeenCalled();
});
