import React from 'react';
import renderer from 'react-test-renderer';
import SignOut from './SignOut';

it('renders', () => {
  const component = renderer.create(<SignOut signOut={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});
