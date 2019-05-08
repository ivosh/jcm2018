import React from 'react';
import { Button, TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import SignIn from './SignIn';

it('prázdný formulář', () => {
  const component = renderer.create(<SignIn signingIn={false} onSubmit={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('formulář při načítání', () => {
  const component = renderer.create(<SignIn signingIn={true} onSubmit={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('handle succesfull form submit', () => {
  const onSubmit = jest.fn();

  const component = renderer.create(<SignIn signingIn={false} onSubmit={onSubmit} />);
  expect(component.root.findAllByType(TextInput)).toHaveLength(2);
  expect(component.root.findByType(Button)).toBeTruthy();

  component.root.findAllByType(TextInput)[0].props.onChangeText('tumáš');
  component.root.findAllByType(TextInput)[1].props.onChangeText('jcm');
  component.root.findByType(Button).props.onPress();
  expect(onSubmit).toHaveBeenCalledWith('tumáš', 'jcm');
});
